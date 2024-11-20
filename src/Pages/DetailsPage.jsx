import { Container } from "react-bootstrap";
import PokemonService from "../Services/PokemonService";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const DetailsPage = () => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  const fetchPokemonById = async () => {
    try {
      const response = await PokemonService.getPokemonById(id);
      const response2 = await PokemonService.getPokemonById2(id);
      const response3 = await PokemonService.getForceFaiblesse(
        response2.data.types[0].type.name
      );

      setPokemon({ ...response3.data, ...response.data, ...response2.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonById();
  }, []);

  // Définition du texte flavor en français ou message par défaut
  let flavorText = "";
  if (pokemon.flavor_text_entries) {
    const frenchFlavor = pokemon.flavor_text_entries.find(
      (entry) => entry.language.name === "fr"
    );
    flavorText = frenchFlavor
      ? frenchFlavor.flavor_text
      : "Aucune description en français disponible.";
  }
  console.log(pokemon);

  // Préparer les statistiques pour le graphique
  const statistique =
    pokemon.stats?.map((stat) => ({
      label: stat.stat.name, // Nom de la statistique
      y: stat.base_stat, // Valeur de la statistique
    })) || [];

  // Options du graphique
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: `Statistiques de ${pokemon.name || "Pokémon"}`,
    },
    axisY: {
      title: "Valeur",
      includeZero: true,
    },
    axisX: {
      title: "Statistiques",
      labelAngle: -45,
    },
    data: [
      {
        type: "column", // Type de graphique
        dataPoints: statistique, // Les données générées dynamiquement
      },
    ],
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <div>
        {/* Titre */}
        <div className="d-flex flex-column align-items-center mb-5">
          <h1>
            {pokemon.name} N°{pokemon.id}
          </h1>
        </div>

        {/* Image et description */}
        <div className="d-flex justify-content-between align-items-center gap-5">
          <div>
            <img
              src={"https://img.pokemondb.net/artwork/" + pokemon.name + ".jpg"}
              style={{ maxWidth: "200px", marginRight: "20px" }}
              alt={pokemon.name}
            />
          </div>
          <div>
            <h3>
              <p>{flavorText}</p>
            </h3>
          </div>
        </div>
        <div className="d-flex justify-content-between">
  {/* Types */}
  <div className="list-container">
    <h3 className="section-title">Types:</h3>
    <ul>
      {pokemon.types?.map((typeObj, index) => (
        <li key={index} className={`type-item ${typeObj.type.name}`}>
          {typeObj.type.name}
        </li>
      ))}
    </ul>
  </div>

  {/* Forces */}
  <div className="list-container">
    <h3 className="section-title">Forces:</h3>
    <ul>
      {pokemon.damage_relations?.double_damage_to?.map((strength, index) => (
        <li key={index} className={`force-item ${strength.name}`}>
          {strength.name}
        </li>
      ))}
    </ul>
  </div>

  {/* Faiblesses */}
  <div className="list-container">
    <h3 className="section-title">Faiblesses:</h3>
    <ul>
      {pokemon.damage_relations?.double_damage_from?.map((weakness, index) => (
        <li key={index} className={`weakness-item ${weakness.name}`}>
          {weakness.name}
        </li>
      ))}
    </ul>
  </div>
</div>
        {/* Statistiques */}
        <h2 className="mt-5"></h2>
        <CanvasJSChart options={options} />
      </div>
    </Container>
  );
};

export default DetailsPage;
