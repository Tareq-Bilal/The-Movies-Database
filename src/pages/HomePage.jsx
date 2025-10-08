import React from 'react';
import styles from '../pages/HomePage.module.css';
import Hero from '../components/Hero/Hero';
import TrendingMoviesSlider from '../components/TrendingMovies/TrendingMoviesSlider';
import TrendingTvSlider from '../components/TrendingTv/TrendingTvSlider';

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendingMoviesSlider />
      <TrendingTvSlider />
    </div>
  );
};

export default Home;
