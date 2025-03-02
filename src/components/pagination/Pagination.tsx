import React, { useMemo, useState } from 'react'
import styles from './Pagination.module.scss'

interface IPaginationProps {
  currentPage: number;
  productsPerPage: number;
  setCurrentPage: (page: number) => void;
  totalProducts: number;
}

const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts
}: IPaginationProps) => {

  const pageNumbers = useMemo(() => {
    return Array.from({ length: Math.ceil(totalProducts / productsPerPage) }, (_, i) => i + 1);
  }, [totalProducts, productsPerPage]);

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginateNextPage = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrevPage = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  

  return (
    <div className={styles.pagination}>
      <li
        onClick={paginatePrevPage}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ''}
      >
        {"<"}
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li key={number} onClick={() => paginate(number)} className={currentPage === number ? `${styles.active}` : ''}>
              {number}
            </li>
          )
        }
      })}

      <li onClick={paginateNextPage} className={currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : ''}>
        {">"}
      </li>
    </div>
  )
}

export default Pagination