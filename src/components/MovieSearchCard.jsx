import React from 'react';
import styles from './MovieSearchCard.module.css';

const MovieSearchCard = ({
  title,
  original_title,
  release_date,
  poster_path,
  overview,
  knownForDepartment,
  knownForTitles,
}) => {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/placeholder-image.jpg';

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.movieCard}>
      <div className={styles.posterContainer}>
        <img
          src={posterUrl}
          alt={title || original_title}
          className={styles.poster}
        />
      </div>
      <div className={styles.movieInfo}>
        <h2 className={styles.title}>
          {title || original_title}
          {original_title && title !== original_title && (
            <span className={styles.originalTitle}>({original_title})</span>
          )}
          <p className={styles.releaseDate}>{formatDate(release_date)}</p>
        </h2>

        {/* For people: show department and known for titles */}
        {knownForDepartment && (
          <p className={styles.overview}>
            <span className={styles.department}>{knownForDepartment}</span>
            {knownForTitles && (
              <span className={styles.knownFor}> • {knownForTitles}</span>
            )}
          </p>
        )}

        {/* For movies/TV: show overview */}
        {!knownForDepartment && overview && (
          <p className={styles.overview}>{overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearchCard;
