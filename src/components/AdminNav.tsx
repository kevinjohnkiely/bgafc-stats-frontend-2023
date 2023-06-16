import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './../styles/AdminNav.module.css'
import { User } from '../models/user';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';

interface AdminNavProps {
  loggedInUser: User | null;
  onLoginClicked: () => void;
  onLoggedOut: () => void;
}

const AdminNav = ({
  loggedInUser,
  onLoginClicked,
  onLoggedOut
}: AdminNavProps) => {
  return (
    <Navbar variant='light' bg='light' expand='sm'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          {loggedInUser ? (
            <NavBarLoggedInView
              user={loggedInUser}
              onLogoutSuccess={onLoggedOut}
            />
          ) : (
            <NavBarLoggedOutView onLoginClicked={onLoginClicked} />
          )}
          {/* <Nav className='me-auto'>
            <Nav.Link href='#home'>Main Site</Nav.Link>
            <Nav.Link as={Link} to={'/'}>
              All Players
            </Nav.Link>
            <Nav.Link href='#link'>Add A Player</Nav.Link>
            <Nav.Link as={Link} to={'/login'}>
              Login/Logout
            </Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNav;
