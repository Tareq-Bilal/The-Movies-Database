import React from 'react';
import styles from './Network.module.css';

const Network = ({ network }) => {
  if (!network) {
    return (
      <div className={styles.networkItem}>
        <div className={styles.errorState}>Network not found (404).</div>
      </div>
    );
  }

  return (
    <div className={styles.networkItem}>
      <div className={styles.logoContainer}>
        <div className={styles.noLogo}>{network.name}</div>
      </div>
    </div>
  );
};

export default Network;
