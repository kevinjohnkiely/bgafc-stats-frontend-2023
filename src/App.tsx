import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link, Route, Routes } from 'react-router-dom';
import header from './assets/images/header.jpg';
import AdminNav from './components/AdminNav';
import NotFoundPage from './pages/NotFoundPage';
import PlayerList from './pages/PlayerList';
import PlayerSingle from './pages/PlayerSingle';
import styles from './styles/App.module.css';
import { apiUrl } from './utils/apiUrl';

import LoginModal from './components/LoginModal';
import { Player } from './models/player';
import { Season } from './models/season';
import { User } from './models/user';
import AddEditPlayer from './pages/AddEditPlayer';
import AddEditSeason from './pages/AddEditSeason';
import AddImage from './pages/AddImage';
import MainNav from './components/MainNav';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [queryStr, setQueryStr] = useState<string>('');
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);
  const [seasonToEdit, setSeasonToEdit] = useState<Season | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoggedOutMessage, setShowLoggedOutMessage] = useState(false);

  useEffect(() => {
    // LOAD THE PLAYER DATA
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await fetch(`${apiUrl}players?sort=${queryStr}`, {
        method: 'GET',
      });
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

    // LOAD THE CURRENT USER, IF ANY
    const getLoggedInUser = async () => {
      const response = await fetch(`${apiUrl}users/getuser`, { method: 'GET' });
      const user = await response.json();
      setLoggedInUser(user.data.user);
    };
    getLoggedInUser();
  }, [queryStr]);

  const deletePlayer = async (slug: string) => {
    await fetch(`${apiUrl}players/${slug}`, {
      method: 'DELETE',
    });
    setPlayers(
      players.filter((existingPlayer) => existingPlayer.slug !== slug)
    );
  };

  return (
    <Container className={styles.pageMaxWidth}>
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccess={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}

      <header className={styles.pageMarginTop}>
        <Link to={'/'}>
          <Image
            src={header}
            alt='Ballingarry AFC stats 1984 - Present'
            fluid
            className={styles.headerImageFullWidth}
          />
        </Link>
      </header>
      <MainNav />
      <AdminNav
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setShowLoginModal(true);
          setShowLoggedOutMessage(false);
        }}
        onLoggedOut={() => {
          setLoggedInUser(null);
          setShowLoggedOutMessage(true);
        }}
      />

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
                onPlayerEditClicked={setPlayerToEdit}
                onClearEditPlayer={() => setPlayerToEdit(null)}
                onSetQueryString={setQueryStr}
                loggedInUser={loggedInUser}
                loggedOutMsg={showLoggedOutMessage}
              />
            }
          />
          <Route
            path='/players/:slug'
            element={
              <PlayerSingle
                loggedInUser={loggedInUser}
                onSeasonEditClicked={setSeasonToEdit}
                onClearEditSeason={() => setSeasonToEdit(null)}
              />
            }
          />
          {loggedInUser && (
            <>
              <Route
                path='/addseason/:playerId/:slug/:team'
                element={<AddEditSeason seasonToEdit={seasonToEdit} />}
              />
              <Route path='/addimage/:playerSlug' element={<AddImage />} />
              <Route
                path='/addplayer'
                element={
                  <AddEditPlayer
                    playerToEdit={playerToEdit}
                    onPlayerSaved={(newPlayer) => {
                      if (playerToEdit) {
                        setPlayers(
                          players.map((existingPlayer) =>
                            existingPlayer._id === newPlayer._id
                              ? newPlayer
                              : existingPlayer
                          )
                        );
                      } else {
                        setPlayers([...players, newPlayer]);
                      }
                    }}
                  />
                }
              />
            </>
          )}
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
