import React from 'react';
import styles from './Hero.module.css';
import { useFetchPoster, getRandomPoster } from '../hooks/useFetchPoster';
import HeroSearchBar from './HeroSearchBar';

const Hero = ({ title, subtitle }) => {
  const { data, loading, error } = useFetchPoster();

  const posterUrl = getRandomPoster(data);

  if (error) return <div className={styles.hero}>Error: {error}</div>;

  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: posterUrl ? `url(${posterUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.subtitle}>{subtitle}</h3>
        <HeroSearchBar />
      </div>
    </div>
  );
};

export default Hero;
