import styles from './../styles/MainNav.module.css';
import { FaCaretDown, FaCaretRight, FaBars } from 'react-icons/fa';

const MainNav = () => {
  return (
    <nav role='navigation' className={styles.menu}>
      <label htmlFor='menu'>
        <FaBars size={28} style={{ color: 'white' }} />
      </label>
      <ul>
        <li>
          <a href='http://ballingarryafc.com/'>Home</a>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='http://ballingarryafc.com/results/'>
            Results
            <label title='toggle menu' htmlFor='results'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li>
              <a href='http://ballingarryafc.com/results/results-archive'>
                Results Archive
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='#'>
            Gallery
            <label title='toggle menu' htmlFor='gallery'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li className={`${styles.menuHasdropdown} ${styles.menuHasflyout}`}>
              <a href=''>
                Underage
                <label title='toggle menu' htmlFor='underage'>
                  <FaCaretRight />
                </label>
              </a>
              <ul className={styles.menuDropdown}>
                <li>
                  <a href='http://ballingarryafc.com/under-8/'>Under 8s</a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/under-10-11/'>
                    Under 10 & 11s
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/under-12-13/'>
                    Under 12 & 13s
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/under-14-15/'>
                    Under 14 & 15s
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/under-16-17/'>
                    Under 16 & 17s
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/youths/'>Youths</a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/annual-awards/'>
                    Annual Awards
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/fai-summer-camps/'>
                    FAI Summer Camps
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/representative/'>
                    Boys Representative
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/photo-gallery-girls-representative/'>
                    Girls Representative
                  </a>
                </li>
              </ul>
            </li>
            <li className={`${styles.menuHasdropdown} ${styles.menuHasflyout}`}>
              <a href=''>
                Juniors
                <label title='toggle menu' htmlFor='juniors'>
                  <FaCaretRight />
                </label>
              </a>
              <ul className={styles.menuDropdown}>
                <li>
                  <a href='http://ballingarryafc.com/league-cup-finalists/'>
                    League Cup Finalists
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/past-seasons/'>
                    Past Seasons
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href='http://ballingarryafc.com/home-grounds/'>Home Grounds</a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/over-35s/'>Over 35s Team</a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/ballingarry-on-tour/'>
                Ballingarry AFC on Tour
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/special-events/'>
                Special Events/Outings
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/girls-ladies-soccer/'>
                Girls & Ladies Soccer
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/the-flag/'>The Flag</a>
            </li>
          </ul>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='http://ballingarryafc.com/history-of-ballingarry-afc/'>
            History
            <label title='toggle menu' htmlFor='results'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li>
              <a href='http://ballingarryafc.com/team-managers/'>
                Team Managers
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/ballingarry-afc-club-honours/'>
                Club Honours
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/management-committees/'>
                Management Committees
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/club-presidents/'>
                Club Presidents
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/club-captains/'>
                Club Captains
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/league-positions/'>
                Season by Season League Placings
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='http://ballingarryafc.com/all-time-player-statistics-1984-present/'>
            All-Time Player Stats
            <label title='toggle menu' htmlFor='gallery'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li className={`${styles.menuHasdropdown} ${styles.menuHasflyout}`}>
              <a href='http://ballingarryafc.com/sharpshooters/'>
                Sharpshooters
                <label title='toggle menu' htmlFor='juniors'>
                  <FaCaretRight />
                </label>
              </a>
              <ul className={styles.menuDropdown}>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters-hat-tricks/'>
                    Hat-Tricks
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters-match-hauls/'>
                    Match Hauls
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters-season-by-season-top-scorers/'>
                    Season by Season Top Scorers
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-denis-kelly/'>
                    Denis Kelly (142 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-padraig-forde/'>
                    Padraig Forde (127 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-francis-kiely/'>
                    Francis Kiely (124 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-shane-hartnett/'>
                    Shane Hartnett (114 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters-kevin-forde/'>
                    Kevin Forde (97 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-eoin-kennedy/'>
                    Eoin Kennedy (62 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-rory-alymer/'>
                    Rory Alymer (60 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-david-ohanlon/'>
                    David O'Hanlon (59 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-darragh-ogrady/'>
                    Darragh O'Grady (57 goals)
                  </a>
                </li>
                <li>
                  <a href='http://ballingarryafc.com/sharpshooters/sharpshooters-kristian-doyle/'>
                    Kristian Doyle (50 goals)
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href='http://ballingarryafc.com/the-200-club/'>The 200 Club</a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/players-of-the-year/'>
                Players of the Year
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='#'>
            Days of Glory
            <label title='toggle menu' htmlFor='results'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li>
              <a href='http://ballingarryafc.com/glory-glory-ballingarry/'>
                Premier Division Glory
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/desmond-cup-glory/'>
                Desmond Cup Glory
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/league-cup-glory/'>
                League Cup Glory
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/division-1-league-glory/'>
                League Division 1 Glory
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/division-3-league-glory/'>
                League Division 3 Glory
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/munster-junior-cup-glory/'>
                Munster Junior Cup Glory
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/glory-days-to-come/'>
                Glory Days to Come?
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href='http://ballingarryafc.com/contact-ballingarry-afc/'>
            Contact
          </a>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='http://ballingarryafc.com/results/'>
            Policies
            <label title='toggle menu' htmlFor='results'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li>
              <a href='http://ballingarryafc.com/wp-content/uploads/2022/03/BAFC-Child-Protection-Policy_Rev2.pdf'>
                Child Protection Policy
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/wp-content/uploads/2022/03/BAFC-Club-Safety-Statement-Rev-2.pdf'>
                Club Safety Statement
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/wp-content/uploads/2022/08/BAFC-Parent_Player-Code-of-Conduct.pdf'>
                Parent Code of Conduct
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/wp-content/uploads/2022/08/BAFC-Managers-Coaches-Code-of-Conduct.pdf'>
                Managers Code of Conduct
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/wp-content/uploads/2022/12/ClubMedicalBillsPolicy.pdf'>
                Club Medical Bills Policy
              </a>
            </li>
          </ul>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='http://ballingarryafc.com/results/'>
            More
            <label title='toggle menu' htmlFor='results'>
              <FaCaretDown />
            </label>
          </a>
          <ul className={styles.menuDropdown}>
            <li>
              <a href='http://ballingarryafc.com/anthony-forde/'>
                Anthony Forde
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/weekly-lotto-draw/'>
                Weekly Lotto Draw
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/category/lotto/'>
                Lotto News & Results
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/astroturf-training-pitch/'>
                Astropark Ballingarry
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/mikey-danaher-memorial-lifetime-membership/'>
                Mikey Danaher Memorial Lifetime Membership
              </a>
            </li>
            <li>
              <a href='http://ballingarryafc.com/vantage-club/'>
                FAI Vantage Club
              </a>
            </li>
            <li>
              <a href='https://www.oneills.com/shop-by-team/soccer/soccer-clubs/ballingarry-afc.html'>
                Club Shop
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
