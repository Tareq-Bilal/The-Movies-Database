import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HamburgerMenu.module.css';

const HamburgerMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div className={styles.backdrop} onClick={onClose}></div>

      {/* Menu */}
      <div className={styles.menu}>
        <nav className={styles.menuNav}>
          {/* Main Navigation */}
          <div className={styles.menuSection}>
            <Link to="/movies" className={styles.menuLink} onClick={onClose}>
              Movies
            </Link>
            <Link to="/tv" className={styles.menuLink} onClick={onClose}>
              TV Shows
            </Link>
            <Link to="/people" className={styles.menuLink} onClick={onClose}>
              People
            </Link>
          </div>

          {/* Secondary Links */}
          <div className={styles.menuSection}>
            <Link
              to="/bible"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              Contribution Bible
            </Link>
            <Link
              to="/discussions"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              Discussions
            </Link>
            <Link
              to="/leaderboard"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              Leaderboard
            </Link>
            <Link
              to="/api"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              API
            </Link>
            <Link
              to="/support"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              Support
            </Link>
            <Link
              to="/about"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              About
            </Link>
          </div>

          {/* Logout */}
          <div className={styles.menuSection}>
            <Link
              to="/logout"
              className={styles.menuLinkSecondary}
              onClick={onClose}
            >
              Logout
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
