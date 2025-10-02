import React from 'react';
import styles from './Company.module.css';

const Company = ({ company }) => {
  return (
    <div className={styles.companyItem}>
      <span className={styles.companyName}>{company.name}</span>
    </div>
  );
};

export default Company;
