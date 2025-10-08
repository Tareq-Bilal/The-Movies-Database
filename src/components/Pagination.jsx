import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
