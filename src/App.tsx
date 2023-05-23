import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Route, Routes } from 'react-router-dom';
import header from './assets/images/header.jpg';
import MainNav from './components/MainNav';
import NotFoundPage from './pages/NotFoundPage';
import PlayerList from './pages/PlayerList';
import PlayerSingle from './pages/PlayerSingle';
import styles from './styles/App.module.css';

import { User } from './models/user';

const App = () => {
  const [user, setUser] = useState<User>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const getLoggedInUser = async () => {
      setLoading(true);
      const data = await fetch('/api/v1/users/getuser');
      if (data.status === 500) {
        setError('Server Error: Please try again soon.');
        setLoading(false);
      }
      const json = await data.json();
      if (json.message) {
        setError(json.message);
      } else {
        setUser(json.data.user);
      }
      setLoading(false);
    };
    getLoggedInUser();
  }, []);

  return (
    <Container className={styles.pageMaxWidth}>
      <header className={styles.pageMarginTop}>
        <Image
          src={header}
          alt='Ballingarry AFC stats 1984 - Present'
          fluid
          className={styles.headerImageFullWidth}
        />
      </header>
      <MainNav />
      <Container fluid className={styles.routerPanel}>
        <Routes>
          <Route path='/' element={<PlayerList />} />
          <Route path='/players/:slug' element={<PlayerSingle />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Container>

      <footer className={styles.footerText}>
        Ballingarry AFC - Founded 1984 - Members of Limerick Desmond Football
        League, Football Association of Ireland.
      </footer>
    </Container>
  );
};

export default App;
