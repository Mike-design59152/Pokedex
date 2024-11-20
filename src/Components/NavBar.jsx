import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PokemonService from "../Services/PokemonService";

const NavBar = () => {
  const [types, setTypes] = useState([]); 


  const Filtre = async () => {
    try {
      const response = await PokemonService.getPokemonTypes();
      setTypes(response.data.results); 
    } catch (error) {
      console.error("Erreur lors de la récupération des types :", error);
    }
  };


  useEffect(() => {
    Filtre();
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Pokemon</Navbar.Brand>
        <Nav className="me-auto">
        
          <NavDropdown title="Types" id="basic-nav-dropdown">
            {types.map((type, index) => (
              <NavDropdown.Item
                key={index}
                href={`/types/${type.name}`}
              >
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)} 
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          
          {/* <Nav.Link href="/Details">Details</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link> */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;