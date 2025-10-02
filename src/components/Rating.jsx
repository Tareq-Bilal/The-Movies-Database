import React from 'react';
import styles from './Rating.module.css';

const Rating = ({ percentage = 0 }) => {
  const normalizedPercentage = Math.min(100, Math.max(0, percentage));
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (normalizedPercentage / 100) * circumference;

  const getColor = () => {
    if (normalizedPercentage >= 70) return '#22c55e'; // green
    if (normalizedPercentage >= 40) return '#eab308'; // yellow
    if (normalizedPercentage < 40) return '#ef4444'; // red
    if (normalizedPercentage === 0) {
      return '#ef4444';
    }

    return '#ef4444';
  };

  return (
    <div className={styles.ratingContainer}>
      <svg className={styles.progressRing} width="38" height="38">
        {/* Background circle */}
        <circle
          className={styles.progressRingBackground}
          stroke=""
          strokeWidth="2"
          fill="transparent"
          r={radius}
          cx="19"
          cy="19"
        />
        {/* Progress circle */}
        <circle
          className={styles.progressRingForeground}
          stroke={getColor()}
          strokeWidth="2"
          fill="transparent"
          r={radius}
          cx="19"
          cy="19"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className={styles.percentageText}>
        {normalizedPercentage === 0 ? (
          'NR'
        ) : (
          <>
            {Math.round(normalizedPercentage)}
            <span className={styles.percentageSign}>%</span>
          </>
        )}
      </div>
    </div>
  );
};

// Export the Rating component as default
export default Rating;
