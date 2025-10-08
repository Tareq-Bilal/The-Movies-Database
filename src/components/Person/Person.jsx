import React from 'react';
import styles from './Person.module.css';
import PersonPlaceholderImage from '../../assets/person-image-placeholder.png';

const Person = ({ name, profile_path, known_for_department, known_for }) => {
  // Extract known_for titles
  const knownForTitles = known_for
    ? known_for
        .map((work) => work.original_title || work.original_name)
        .filter(Boolean)
        .join(', ')
    : '';

  const profileUrl = profile_path
    ? `https://image.tmdb.org/t/p/w200${profile_path}`
    : PersonPlaceholderImage;

  return (
    <div className={styles.personItem}>
      <div className={styles.profileContainer}>
        <img
          src={profileUrl}
          alt={name}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.personInfo}>
        <h3 className={styles.personName}>{name}</h3>
        <div className={styles.personDetails}>
          {known_for_department && (
            <span className={styles.department}>
              {known_for_department}
            </span>
          )}
          {knownForTitles && (
            <span className={styles.knownFor}> • {knownForTitles}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Person;
