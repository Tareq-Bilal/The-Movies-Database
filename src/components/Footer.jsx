import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <img
              src="/Logo-Footer.svg"
              alt="TMDB Logo"
              width="130"
              height="94"
            />
          </div>
          <button className={styles.joinButton}>Hi Tareq_2003!</button>
        </div>

        {/* The Basics Section */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>THE BASICS</h3>
          <ul className={styles.linkList}>
            <li>
              <Link to="/about" className={styles.footerLink}>
                About TMDB
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.footerLink}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/forums" className={styles.footerLink}>
                Support Forums
              </Link>
            </li>
            <li>
              <Link to="/api" className={styles.footerLink}>
                API Documentation
              </Link>
            </li>
            <li>
              <Link to="/status" className={styles.footerLink}>
                System Status
              </Link>
            </li>
          </ul>
        </div>

        {/* Get Involved Section */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>GET INVOLVED</h3>
          <ul className={styles.linkList}>
            <li>
              <Link to="/bible" className={styles.footerLink}>
                Contribution Bible
              </Link>
            </li>
            <li>
              <Link to="/movie/new" className={styles.footerLink}>
                Add New Movie
              </Link>
            </li>
            <li>
              <Link to="/tv/new" className={styles.footerLink}>
                Add New TV Show
              </Link>
            </li>
          </ul>
        </div>

        {/* Community Section */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>COMMUNITY</h3>
          <ul className={styles.linkList}>
            <li>
              <Link to="/guidelines" className={styles.footerLink}>
                Guidelines
              </Link>
            </li>
            <li>
              <Link to="/discussions" className={styles.footerLink}>
                Discussions
              </Link>
            </li>
            <li>
              <Link to="/leaderboard" className={styles.footerLink}>
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>LEGAL</h3>
          <ul className={styles.linkList}>
            <li>
              <Link to="/terms" className={styles.footerLink}>
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/api-terms" className={styles.footerLink}>
                API Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/privacy" className={styles.footerLink}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/dmca" className={styles.footerLink}>
                DMCA Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
