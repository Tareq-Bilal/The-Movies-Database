import React, { useState } from 'react';
import styles from './SliderCard.module.css';
import { SLIDER_IMAGE_BASE_URL } from '../lib/config';
import Rating from './Rating';
import CardOptions from './CardOptions';

const SliderCard = ({ data, hasBackground = false }) => {
  const [blur, setBlur] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className={styles.sliderCard}>
        <CardOptions
          onBlurSliderCard={setBlur}
          onMenuStateChange={setMenuOpen}
          className={styles.cardOptions}
        />
        {/* Movie poster */}
        <div
          className={
            blur
              ? `${styles.posterContainer} ${styles.blur}`
              : styles.posterContainer
          }
        >
          {data?.poster_path ? (
            <img
              src={`${SLIDER_IMAGE_BASE_URL}${data.poster_path}`}
              alt={data.title || data.name}
              className={styles.poster}
            />
          ) : (
            <div className={styles.placeholderPoster}>No Image</div>
          )}
          <Rating percentage={data?.vote_average * 10} />
        </div>

        {/* Movie info */}
        <div
          className={
            blur ? `${styles.movieInfo} ${styles.blur}` : styles.movieInfo
          }
        >
          <h3
            className={`${styles.movieTitle} ${hasBackground ? styles.titleWithBackground : ''}`}
          >
            {data?.title || data?.name || 'Unknown Title'}
          </h3>
          <p
            className={`${styles.movieDate} ${hasBackground ? styles.dateWithBackground : ''}`}
          >
            {data?.release_date || data?.first_air_date || 'No Date'}
          </p>
        </div>
      </div>
    </>
  );
};

export default SliderCard;
