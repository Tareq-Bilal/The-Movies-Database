import React from 'react';
import styles from './Person.module.css';

const Person = ({ person }) => {
  // Extract known_for titles
  const knownForTitles = person.known_for
    ? person.known_for
        .map((work) => work.original_title || work.original_name)
        .filter(Boolean)
        .join(', ')
    : '';

  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
    : '/placeholder-profile.jpg';

  return (
    <div className={styles.personItem}>
      <div className={styles.profileContainer}>
        <img
          src={profileUrl}
          alt={person.name}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.personInfo}>
        <h3 className={styles.personName}>{person.name}</h3>
        <div className={styles.personDetails}>
          {person.known_for_department && (
            <span className={styles.department}>
              {person.known_for_department}
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
