import React from 'react';
import { getImageUrl } from '../lib/api';
import styles from './Network.module.css';

const Network = ({ network }) => {
  const logoUrl = network.logo_path
    ? getImageUrl(network.logo_path, 'w200')
    : null;

  return (
    <div className={styles.networkItem}>
      <div className={styles.logoContainer}>
        {logoUrl ? (
          <img src={logoUrl} alt={network.name} className={styles.logo} />
        ) : (
          <div className={styles.noLogo}>{network.name}</div>
        )}
      </div>
    </div>
  );
};

export default Network;
