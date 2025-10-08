import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import HeroSearchBar from './HeroSearchBar';
import { getMoviePoster } from '../../services/movies';

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const posterUrl = await getMoviePoster();
        setBackgroundImage(posterUrl);
      } catch (err) {
        console.error('Error fetching background image:', err);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Welcome.</h2>
        <h3 className={styles.subtitle}>
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>

      <HeroSearchBar />
      </div>
    </div>
  );
};

export default Hero;
