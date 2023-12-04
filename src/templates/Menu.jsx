import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Opções" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/cadastroUsuario">Cadastro de Usuário</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/batepapo">Bate-papo</NavDropdown.Item>

                        </NavDropdown>
        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}