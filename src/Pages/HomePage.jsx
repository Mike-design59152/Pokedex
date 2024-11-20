import { useEffect, useState } from "react";
import { Container, Form, Pagination } from "react-bootstrap";
import PokemonCard from "../Components/PokemonCard"; 
import PokemonService from "../Services/PokemonService";

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const limit = 21;
  const [page, setPage] = useState (1);
const [totalPokemons, setTotalPokemons] = useState(0);

  const handleChange = (e) => {
    setSearchValue(e.currentTarget.value);
  };

  // Fonction pour récupérer les Pokémon
  const fetchPokemons = async () => {
    try {
        const offset = (page - 1) * limit;
      const response = await PokemonService.getAllPokemon(offset, limit); 
      console.log(response.data); 
      const data = response.data; 
      if (data && Array.isArray(data.results)) {
        
        const pokemonDataPromises = data.results.map(async (pokemon) => {
          const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
          return {
            name: pokemonDetails.name,
            id: pokemonDetails.id,
            image: pokemonDetails.sprites.front_default,
            types: pokemonDetails.types.map((type) => type.type.name).join(", "),
          };
        });

        const pokemonsWithDetails = await Promise.all(pokemonDataPromises);

        setPokemons(pokemonsWithDetails);
        setFilteredPokemons(pokemonsWithDetails);
        setTotalPokemons(data.count)
      } else {
        console.error("Les données ne contiennent pas de 'results' ou 'results' n'est pas un tableau");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemons(); 
  }, [page]);

  useEffect(() => {
    
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())
      )
    );
  }, [searchValue, pokemons]);

  const renderPagination = () => {
    const totalPages = Math.ceil(totalPokemons / limit);
    const maxVisiblePages = 5;

    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    return (
      <Pagination>
        {/* Bouton Première page */}
        <Pagination.First
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          Première
        </Pagination.First>

        {/* Bouton Précédent */}
        <Pagination.Prev
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Précédent
        </Pagination.Prev>

        {/* Pages visibles */}
        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map(
          (pageNumber) => (
            <Pagination.Item
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          )
        )}

        {/* Bouton Suivant */}
        <Pagination.Next
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page === totalPages}
        >
          Suivant
        </Pagination.Next>

        {/* Bouton Dernière page */}
        <Pagination.Last
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          Dernière
        </Pagination.Last>
      </Pagination>
    );
  };





  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Liste des Pokémon</h1>

      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Recherche un Pokémon</Form.Label>
          <Form.Control
            type="text"
            placeholder="Exemple : Pikachu"
            value={searchValue}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-center flex-wrap gap-4">
        {filteredPokemons.length === 0 ? (
          <p>Aucun Pokémon trouvé...</p> 
        ) : (
          filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon} 
            />
          ))
        )}
      </div>
      <div className="mt-4">{renderPagination()}</div>
    </Container>
  );
};

export default HomePage;