import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './../styles/MainNav.module.css';

const MainNav = () => {
  return (
    <Navbar className={styles.bgDark} variant='dark' expand='sm'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>News</Nav.Link>
            <Nav.Link as={Link} to={'/'}>
              All-Time Player Stats
            </Nav.Link>
            <Nav.Link as={Link} to={'/login'}>
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
