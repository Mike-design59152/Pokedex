import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonService from "../Services/PokemonService";
import PokemonCard from "../Components/PokemonCard";

const PokemonByTypePage = () => {
  const { type } = useParams(); 
  const [pokemonList, setPokemonList] = useState([]);

    const fetchPokemonsByType = async () => {
      try {
        const response = await PokemonService.getPokemonByType(type);


const formattedPokemonList = await Promise.all(
      response.data.pokemon.map(async (poke) => {
        const pokemonId = poke.pokemon.url.split("/")[6]; 
        const pokemonDetails = await PokemonService.getPokemonById2(pokemonId); 

        return {
          id: pokemonDetails.data.id, 
          name: pokemonDetails.data.name,
          image: pokemonDetails.data.sprites.front_default, 
          types: pokemonDetails.data.types.map((type) => type.type.name).join(", "), 
        };
      })
    );

    setPokemonList(formattedPokemonList);
  } catch (error) {
    console.error("Erreur lors de la récupération des Pokémon par type :", error);
  }
};    useEffect(() => {
      fetchPokemonsByType();
  }, [type]); 

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Pokémons de type {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      <div className="d-flex justify-content-center flex-wrap gap-4">
        {pokemonList.length > 0 ? (
          pokemonList.map((pokemon) => (
            <div className="col-md-3" key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </div>
          ))
        ) : (
          <p>Aucun Pokémon trouvé pour ce type.</p>
        )}
      </div>
    </div>
  );
};
export default PokemonByTypePage;