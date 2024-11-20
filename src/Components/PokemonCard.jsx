import { Card, Badge } from "react-bootstrap"; // Importez Badge pour styliser les types
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate("/pokemon/" + id);
  };

  console.log(pokemon);
  
  return (
    <Card
      style={{ width: "18rem" }}
      onClick={() => {
        navigateTo(pokemon.name);
      }}
      className="mb-4"
    >
      <Card.Title className="d-flex justify-content-center gap-2">
        {" "}
        <span className="d-flex justify-content-center">{pokemon.id}</span>{" "}
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Card.Title>

      <Card.Img variant="top" src={pokemon.image} alt={pokemon.name} />
      <Card.Body>
        <Card.Text>
          <strong>Types:</strong>
          {pokemon.types && pokemon.types.split(", ").map((type, index) => (
            <Badge key={index} pill variant="primary" className="mx-1">
              {type}
            </Badge>
          ))}
        </Card.Text>

        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.string.isRequired,
  }).isRequired,
};
export default PokemonCard;
