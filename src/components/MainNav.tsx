import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import styles from './../styles/MainNav.module.css';
import { FaCaretDown, FaCaretRight, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav role='navigation' className={styles.menu}>
      <label htmlFor='menu'>
        <FaBars size={28} style={{ color: 'white'}} />
      </label>
      <input type='checkbox' id='menu' />
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
              <a href='http://ballingarryafc.com/results/results-archive'>Results Archive</a>
            </li>
          </ul>
        </li>
        <li className={styles.menuHasdropdown}>
          <a href='#'>
            Gallery
            <label title='toggle menu' htmlFor='about'>
              {/* <i className='fa fa-caret-down'></i> */}
              <FaCaretDown />
            </label>
          </a>
          <input type='checkbox' id='about' />
          <ul className={styles.menuDropdown}>
            <li>
              <a href=''>History</a>
            </li>
            <li>
              <a href=''>Mission</a>
            </li>
            {/* <li className='menu-hasdropdown menu-hasflyout'> */}
            <li className={`${styles.menuHasdropdown} ${styles.menuHasflyout}`}>
              <a href=''>
                Services
                <label title='toggle menu' htmlFor='services'>
                  {/* <i className='fa fa-caret-down menu-downicon'></i> */}
                  <FaCaretRight />
                  {/* <i className={`fa fa-caret-down ${styles.menuDownicon}`}></i>
                  <i className='fa fa-caret-right menu-righticon'></i> */}
                </label>
              </a>
              <input type='checkbox' id='services' />
              <ul className={styles.menuDropdown}>
                <li>
                  <a href=''>Service 1</a>
                </li>
                <li>
                  <a href=''>Service 2</a>
                </li>
                <li>
                  <a href=''>Service 3</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href='#'>Team Managers</a>
        </li>
        <li>
          <a href='#'>History</a>
        </li>
        <li>
          <a href='#'>All-Time Player Stats</a>
        </li>
        <li>
          <a href='#'>Days of Glory</a>
        </li>
        <li>
          <a href='#'>Contact</a>
        </li>
        <li>
          <a href='#'>Policies</a>
        </li>
        <li>
          <a href='#'>More</a>
        </li>
      </ul>
    </nav>
  );
};

export default MainNav;
