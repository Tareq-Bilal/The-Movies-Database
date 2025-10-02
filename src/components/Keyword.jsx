import React from 'react';
import styles from './Keyword.module.css';

const Keyword = ({ keyword }) => {
  return (
    <div className={styles.keywordItem}>
      <span className={styles.keywordText}>{keyword}</span>
    </div>
  );
};

export default Keyword;
