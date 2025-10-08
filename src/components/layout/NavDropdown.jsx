import React, { useState } from 'react';
import styles from './NavDropdown.module.css';

const NavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={styles.dropdownWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        href="#" 
        className={styles.navLink}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
      </a>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {items.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className={styles.dropdownItem}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
