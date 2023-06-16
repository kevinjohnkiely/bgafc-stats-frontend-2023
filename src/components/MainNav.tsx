import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './../styles/MainNav.module.css';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <Navbar className={styles.bgDark} variant='dark' expand='sm'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav.Link as={Link} to={'http://ballingarryafc.com/'}>
            News
          </Nav.Link>
          <NavDropdown title='Results' id='basic-nav-dropdown'>
            <NavDropdown.Item
              as={Link}
              to={'http://ballingarryafc.com/results/results/'}
            >
              Results
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to={'http://ballingarryafc.com/results/results-archive/'}
            >
              Results Archive
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Gallery' id='basic-nav-dropdown'>
            <NavDropdown title='Gallery' id='basic-nav-dropdown'>
              <NavDropdown.Item
                as={Link}
                to={'http://ballingarryafc.com/home-grounds/'}
              >
                Home Grounds
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to={'http://ballingarryafc.com/over-35s/'}
              >
                Over 35s Team
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown.Item
              as={Link}
              to={'http://ballingarryafc.com/home-grounds/'}
            >
              Home Grounds
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to={'http://ballingarryafc.com/over-35s/'}
            >
              Over 35s Team
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
