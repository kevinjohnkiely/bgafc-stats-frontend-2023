import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './../styles/MainNav.module.css';
import { useTypedSelector } from '../redux/redux-hooks/useTypedSelector';
import { useEffect } from 'react';
import { userActionCreators } from '../redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MainNav = () => {
  const { user, error, loading } = useTypedSelector((state) => state.loginUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userActionCreators.getLoggedInUser() as any);
  }, [dispatch]);

  const logout = async () => {
    await fetch('/api/v1/users/logout', { method: 'POST' });
    // redirect here too
    navigate('/');
  };

  return (
    <Navbar className={styles.bgDark} variant='dark' expand='sm'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Main Site</Nav.Link>
            <Nav.Link as={Link} to={'/'}>
              All Players
            </Nav.Link>
            <Nav.Link href='#link'>Add A Player</Nav.Link>
            {user !== '' ? (
              <Nav.Link as={Link} to={'#'} onClick={logout}>
                Logout, {user}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to={'/login'}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
