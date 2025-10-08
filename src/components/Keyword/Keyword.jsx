import React from 'react';
import styles from './Keyword.module.css';

const Keyword = ({ name }) => {
  return (
    <div className={styles.keywordItem}>
      <span className={styles.keywordText}>{name}</span>
    </div>
  );
};

export default Keyword;
