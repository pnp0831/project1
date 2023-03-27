import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './pagination.module.scss';

type Props = {
  itemsPerPage: number;
  totalItems: number;
  siblingCount: number;
  onPageChange: () => {};
  showLast: number;
};

const Pagination = ({
  itemsPerPage = 8,
  totalItems = 40,
  onPageChange = () => {},
  siblingCount = 2,
  currentPage = 1,
  showLast = true,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 1) {
      return pageNumbers;
    }

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    const leftSiblingIndex = Math.max(1, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(totalPages, currentPage + siblingCount);

    if (currentPage > siblingCount + 1) {
      pageNumbers.push(1);
      if (currentPage > siblingCount + 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - siblingCount) {
      if (currentPage < totalPages - siblingCount - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.pagination}>
      {showLast && (
        <button
          className={clsx(styles.item, {
            [styles.disabled]: currentPage === 1,
          })}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="first"
        >
          <div className={styles.imgFirst} />
        </button>
      )}

      <button
        className={clsx(styles.item, {
          [styles.disabled]: currentPage === 1,
        })}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="prev"
      >
        <div className={styles.imgPrev} />
      </button>

      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(number)}
          disabled={number === '...'}
          className={clsx(styles.item, 'body2', {
            [styles.active]: currentPage === number,
            [styles.disabled]: number === '...',
          })}
          aria-label={number}
        >
          {number}
        </button>
      ))}

      <button
        className={clsx(styles.item, {
          [styles.disabled]: currentPage === totalPages,
        })}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="next"
      >
        <div className={styles.imgNext} />
      </button>

      {showLast && (
        <button
          className={clsx(styles.item, {
            [styles.disabled]: currentPage === totalPages,
          })}
          disabled={currentPage === totalPages}
          aria-label="last"
          onClick={() => onPageChange(pageNumbers[pageNumbers.length - 1])}
        >
          <div className={styles.imgLast} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
