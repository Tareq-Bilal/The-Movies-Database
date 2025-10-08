import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { FaBell, FaSearch } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Navbar = ({ onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <button
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-label="open menu"
            onClick={toggleMenu}
          >
            <GiHamburgerMenu />
          </button>

          <Link to="/">
            <div className={styles.brandWrap}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                alt="The Movie Database"
              />
            </div>
          </Link>

          <div className={styles.actions}>
            <button
              className={`${styles.iconButton} ${styles.notificationButton}`}
              aria-label="notifications"
            >
              <FaBell />
            </button>
            <div className={styles.avatar} title="T">
              T
            </div>
            <button
              className={styles.iconButton}
              aria-label="search"
              onClick={onSearchClick}
            >
              <FaSearch />
            </button>
          </div>
        </nav>
      </header>

      <HamburgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;
