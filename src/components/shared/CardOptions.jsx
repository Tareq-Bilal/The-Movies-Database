import React, { useState, useRef, useEffect } from 'react';
import styles from './CardOptions.module.css';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import { IoIosStar } from 'react-icons/io';
import { Ellipsis } from 'lucide-react';

const icons = {
  list: <TfiMenuAlt size={14} />,
  heart: <FaHeart size={14} />,
  bookmark: <FaBookmark size={14} />,
  star: <IoIosStar size={14} />,
};

const options = [
  { icon: 'list', label: 'Add to list' },
  { icon: 'heart', label: 'Favorite' },
  { icon: 'bookmark', label: 'Watchlist' },
  { icon: 'star', label: 'Your rating' },
];

const CardOptions = ({ onBlurSliderCard, onMenuStateChange }) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef();
  const menuRef = useRef();

  useEffect(() => {
    if (open && onBlurSliderCard) onBlurSliderCard(true);
    if (!open && onBlurSliderCard) onBlurSliderCard(false);
    if (onMenuStateChange) onMenuStateChange(open);
  }, [open, onBlurSliderCard, onMenuStateChange]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.cardOptionsRoot}>
      {!open && (
        <button
          ref={btnRef}
          className={styles.optionsBtn}
          aria-label="Show options"
          onClick={() => setOpen((v) => !v)}
        >
          <div className={styles.ellipsisContainer}>
            <Ellipsis
              className={styles.ellipsisIcon}
            />
          </div>
        </button>
      )}
      {open && (
        <div className={styles.optionsMenu} ref={menuRef}>
          {options.map((opt) => (
            <div key={opt.label} className={styles.menuItem} tabIndex={0}>
              <span className={styles.icon}>{icons[opt.icon]}</span>
              <span className={styles.label}>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardOptions;
