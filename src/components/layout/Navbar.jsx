import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { FaBell, FaSearch } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import { FaPlus } from "react-icons/fa";
import NavDropdown from './NavDropdown';

const Navbar = ({ onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Dropdown menu items for each nav link
  const moviesDropdown = [
    { label: 'Popular', href: '/movies/popular' },
    { label: 'Now Playing', href: '/movies/now-playing' },
    { label: 'Upcoming', href: '/movies/upcoming' },
    { label: 'Top Rated', href: '/movies/top-rated' },
  ];

  const tvShowsDropdown = [
    { label: 'Popular', href: '/tv/popular' },
    { label: 'Airing Today', href: '/tv/airing-today' },
    { label: 'On TV', href: '/tv/on-tv' },
    { label: 'Top Rated', href: '/tv/top-rated' },
  ];

  const peopleDropdown = [
    { label: 'Popular People', href: '/people/popular' },
  ];

  const moreDropdown = [
    { label: 'Discussions', href: '/discussions' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Support', href: '/support' },
    { label: 'API Documentation', href: '/api' },
    { label: 'API for Business', href: '/api/business' }
  ];

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

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <Link to="/" className={styles.desktopLogo}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB"
                className={styles.desktopLogoImg}
              />
            </Link>
            <nav className={styles.navLinks}>
              <NavDropdown label="Movies" items={moviesDropdown} />
              <NavDropdown label="TV Shows" items={tvShowsDropdown} />
              <NavDropdown label="People" items={peopleDropdown} />
              <NavDropdown label="More" items={moreDropdown} />
            </nav>
          </div>

          <div className={styles.actions}>



            <button
              className={`${styles.iconButton} ${styles.addButton}`}
              aria-label="add"
            >
              <FaPlus />
            </button>

                          <button className={styles.languageButton}>
              <span>EN</span>
              </button>

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
