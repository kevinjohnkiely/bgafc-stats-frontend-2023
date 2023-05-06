import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import PlayerList from './pages/PlayerList';
import header from './assets/images/header.jpg';
import styles from './styles/App.module.css';
import MainNav from './components/MainNav';
import { Routes, Route } from 'react-router-dom';
import PlayerSingle from './pages/PlayerSingle';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';

const App = () => {

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
          <Route path='/login' element={<Login />} />
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
