import React from 'react';
import styles from './MovieSearchResult.module.css';
import { MOVIE_SEARCH_RESULT_POSTER_URL as MOVIE_POSTER} from '../../lib/config';
import formatDate from '../../utils/foramteDate';
import PlaceholderImage from '../../assets/placeholder-image.png';

const MovieSearchResult = ({
  title,
  original_title,
  release_date,
  poster_path,
  overview,
}) => {

  const posterUrl = poster_path
    ? `${MOVIE_POSTER}${poster_path}`
    : PlaceholderImage;

  const displayTitle = title || original_title;
  const showOriginalTitle = original_title && title !== original_title;

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
            <span className={styles.originalTitle}>({original_title})</span>
          )}
          {release_date && (<p className={styles.releaseDate}>{formatDate(release_date)}</p>)}
        </h2>

        {overview && (
          <p className={styles.overview}>{overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearchResult;
