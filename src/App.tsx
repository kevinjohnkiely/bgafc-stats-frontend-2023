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
import Login from './pages/Login';
import AddPlayerModal from './components/AddEditPlayerModal';
import { Button } from 'react-bootstrap';
import { Player } from './models/player';

const App = () => {
  const [user, setUser] = useState<User>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await fetch('/api/v1/players');
      if (data.status === 500) {
        setError('Server Error: Please try again soon.');
        setLoading(false);
      }
      const json = await data.json();
      if (json.message) {
        setError(json.message);
      } else {
        setPlayers(json.data.players);
      }
      setLoading(false);
    };
    fetchPlayers();
  }, []);

  const deletePlayer = async (slug: string) => {
    await fetch(`/api/v1/players/${slug}`, {
      method: 'DELETE',
    });
    setPlayers(
      players.filter((existingPlayer) => existingPlayer.slug !== slug)
    );
  };

  return (
    <Container className={styles.pageMaxWidth}>
      <Button onClick={() => setShowAddPlayerModal(true)}>Add Player</Button>
      {showAddPlayerModal && (
        <AddPlayerModal
          onPlayerSaved={(newPlayer) => {
            setPlayers([...players, newPlayer]);
            setShowAddPlayerModal(false);
          }}
          onDismiss={() => setShowAddPlayerModal(false)}
        />
      )}
      {playerToEdit && (
        <AddPlayerModal
          playerToEdit={playerToEdit}
          onDismiss={() => setPlayerToEdit(null)}
          onPlayerSaved={(updatedPlayer) => {
            setPlayers(
              players.map((existingPlayer) =>
                existingPlayer.slug === updatedPlayer.slug
                  ? updatedPlayer
                  : existingPlayer
              )
            );
            setPlayerToEdit(null);
          }}
        />
      )}
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
          <Route
            path='/'
            element={
              <PlayerList
                players={players}
                error={error}
                loading={loading}
                onDeletePlayerClicked={deletePlayer}
                onPlayerClicked={setPlayerToEdit}
              />
            }
          />
          <Route
            path='/login'
            element={
              <Login
                onLoginSuccessful={(user) => {
                  setUser(user);
                }}
              />
            }
          />
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
