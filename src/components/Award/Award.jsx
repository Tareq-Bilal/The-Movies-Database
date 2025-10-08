import React from 'react';
import styles from './Award.module.css';

const Award = ({ name }) => {
  return (
    <div className={styles.awardItem}>
      <span className={styles.awardName}>{name}</span>
    </div>
  );
};

export default Award;
