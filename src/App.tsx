import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import PlayerList from './components/PlayerList';
import header from './assets/images/header.jpg';
import styles from './styles/App.module.css';

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
      <PlayerList />
      <footer className={styles.footerText}>Ballingarry AFC - Founded 1984 - Members of Limerick Desmond Football League, Football Association of Ireland.</footer>
    </Container>
  );
};

export default App;
