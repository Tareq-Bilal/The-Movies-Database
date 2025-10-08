import React from 'react';
import styles from './Company.module.css';
import { BASE_IMAGE_URL } from '../../lib/config';

const Company = ({ name, origin_country , logo_path }) => {
  const logoUrl = logo_path 
    ? `${BASE_IMAGE_URL}${logo_path}` 
    : null;

  return (
    <div className={styles.companyItem}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className={styles.logo}
        />
      ) : (
        <span className={styles.companyName}>{name}</span>
      )}
      {origin_country && (
        <span className={styles.originCountry}>{origin_country}</span>
      )}
    </div>
  );
};

export default Company;
