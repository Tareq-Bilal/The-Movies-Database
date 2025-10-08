import React from 'react';
import styles from './Collection.module.css';
import { MOVIE_SEARCH_RESULT_POSTER_URL as MOVIE_POSTER} from '../../lib/config';
import PlaceholderImage from '../../assets/placeholder-image.png';

const Collection = ({
  name,
  poster_path,
  overview,
}) => {

  const posterUrl = poster_path
    ? `${MOVIE_POSTER}${poster_path}`
    : PlaceholderImage;

  return (
    <div className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <img
          src={posterUrl}
          alt={name}
          className={`${styles.poster} ${!poster_path ? styles.placeholder : ''}`}
        />
      </div>
      <div className={styles.movieInfo}>
        <h2 className={styles.title}>
          {name}
        </h2>

        {overview && (
          <p className={styles.overview}>{overview}</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
