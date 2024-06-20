import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function Menu() {
    const handleNavLinkClick = (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, // Ajusta el desplazamiento si es necesario
          behavior: 'smooth',
        });
      }
    };
  
    return (
      <Nav className="justify-content-center" activeKey="/" onSelect={handleNavLinkClick}>
        <Nav.Item>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link as={Link} to="/stock">Stock</Nav.Link>
      </Nav.Item>
      
      <Nav.Item>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;