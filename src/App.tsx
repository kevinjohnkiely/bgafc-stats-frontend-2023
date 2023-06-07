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

import AddEditPlayer from './components/AddEditPlayer';
import AddEditSeason from './components/AddEditSeason';
import LoginModal from './components/LoginModal';
import { Player } from './models/player';
import { Season } from './models/season';
import { User } from './models/user';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [playerToEdit, setPlayerToEdit] = useState<Player | null>(null);
  const [seasonToEdit, setSeasonToEdit] = useState<Season | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    console.log('USE EFFECT RUNS in parent app');
    // LOAD THE PLAYER DATA
    const fetchPlayers = async () => {
      console.log('fetch players running');
      setLoading(true);
      const data = await fetch('/api/v1/players', { method: 'GET' });
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
      const response = await fetch('/api/v1/users/getuser', { method: 'GET' });
      const user = await response.json();
      console.log(user.data.user);
      setLoggedInUser(user.data.user);
    };
    getLoggedInUser();
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
        <Image
          src={header}
          alt='Ballingarry AFC stats 1984 - Present'
          fluid
          className={styles.headerImageFullWidth}
        />
      </header>
      <MainNav
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onLoggedOut={() => setLoggedInUser(null)}
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
                loggedInUser={loggedInUser}
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
                element={
                  <AddEditSeason
                    seasonToEdit={seasonToEdit}
                    onSeasonSaved={(newSeason) => {
                      const [findSeasonPlayer] = players.filter(
                        (player) => player._id === newSeason.player
                      );

                      if (seasonToEdit) {
                        if (
                          seasonToEdit?.seasonTotalAppsA! >
                          newSeason?.seasonTotalAppsA!
                        ) {
                          findSeasonPlayer.aTeamApps +=
                            seasonToEdit?.seasonTotalAppsA! -
                            newSeason?.seasonTotalAppsA!;
                        } else {
                          findSeasonPlayer.aTeamApps -=
                            seasonToEdit?.seasonTotalAppsA! -
                            newSeason?.seasonTotalAppsA!;
                        }
                      } else {
                        if (newSeason.seasonTotalAppsA) {
                          findSeasonPlayer.aTeamApps +=
                            newSeason?.seasonTotalAppsA!;
                          findSeasonPlayer.aTeamGoals +=
                            newSeason?.seasonTotalGoalsA!;
                        } else {
                          findSeasonPlayer.bTeamApps +=
                            newSeason?.seasonTotalAppsB!;
                          findSeasonPlayer.bTeamGoals +=
                            newSeason?.seasonTotalGoalsB!;
                        }
                        findSeasonPlayer.totalApps =
                          findSeasonPlayer.aTeamApps +
                          findSeasonPlayer.bTeamApps;
                        findSeasonPlayer.totalGoals =
                          findSeasonPlayer.aTeamGoals +
                          findSeasonPlayer.bTeamGoals;
                      }

                      setPlayers(
                        players.map((existingPlayer) =>
                          existingPlayer._id === findSeasonPlayer._id
                            ? findSeasonPlayer
                            : existingPlayer
                        )
                      );
                    }}
                  />
                }
              />
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
