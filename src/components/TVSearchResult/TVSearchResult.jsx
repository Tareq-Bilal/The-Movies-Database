import React from 'react';
import styles from './TVSearchResult.module.css';
import { MOVIE_SEARCH_RESULT_POSTER_URL as MOVIE_POSTER} from '../../lib/config';
import formatDate from '../../utils/foramteDate';
import PlaceholderImage from '../../assets/placeholder-image.png';

const TVSearchResult = ({
  name,
  original_name,
  first_air_date,
  poster_path,
  overview,
}) => {

  const posterUrl = poster_path
    ? `${MOVIE_POSTER}${poster_path}`
    : PlaceholderImage; // Use placeholder image if poster_path is not available

  const displayTitle = name || original_name;
  const showOriginalTitle = original_name && name !== original_name;

  return (
    <div className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <img
          src={posterUrl}
          alt={displayTitle}
          className={`${styles.poster} ${!poster_path ? styles.placeholder : ''}`}
        />
      </div>
      <div className={styles.movieInfo}>
        <h2 className={styles.title}>
          {displayTitle}
          {showOriginalTitle && (
            <span className={styles.originalTitle}>({original_name})</span>
          )}
          {first_air_date && (<p className={styles.releaseDate}>{formatDate(first_air_date)}</p>)}

        </h2>

        {overview && (
          <p className={styles.overview}>{overview}</p>
        )}
      </div>
    </div>
  );
};

export default TVSearchResult;
