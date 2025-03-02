import { selectFilteredProducts, SORT_PRODUCTS } from '@/redux/slice/filterSlice'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductList.module.scss'
import Pagination from '@/components/pagination/Pagination'
import ProductItem from '../productItem/ProductItem'
import { IProduct } from '@/types'

const ProductList = () => {

  const [sort, setSort] = useState('latest');

  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }))      //sort by price in the filtered products
  }, [dispatch, sort]);

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  console.log('currentProducts', currentProducts);

  const isRadioSelected = (value: string) => sort === value;                    //use Radio fuction to choose one of the buttons of same group
  const handleRadioClick = (e: ChangeEvent<HTMLInputElement>) => setSort(e.target.value);

  return (
    <div className={styles.productList}>
      <div className={styles.top}>
        <div>
          <ul className={styles.sort}>
            <li className={isRadioSelected('latest') ? styles.selected : ""}>
              <input
                type='radio'
                value='latest'
                id='latest'
                checked={isRadioSelected('latest')}
                onChange={handleRadioClick}
              />
              <label htmlFor='latest'>Latest</label>                    {/*use htmlFor function to connect with form element that have an 'id', active if you click the 'label' */}
            </li>

            <li className={isRadioSelected('lowest-price') ? styles.selected : ""}>
              <input
                type='radio'
                value='lowest-price'
                id='lowest-price'
                checked={isRadioSelected('lowest-price')}
                onChange={handleRadioClick}
              />
              <label htmlFor='lowest-price'>Lowest-Price</label>
            </li>

            <li className={isRadioSelected('highest-price') ? styles.selected : ""}>
              <input
                type='radio'
                value='highest-price'
                id='highest-price'
                checked={isRadioSelected('highest-price')}
                onChange={handleRadioClick}
              />
              <label htmlFor='highest-price'>Highest-Price</label>
            </li>
          </ul>
        </div>
        <div className={styles.limit}>
          <select value={productsPerPage} onChange={(e) => setProductsPerPage(Number(e.target.value))}>
            <option value={10}>Show 10 items</option>
            <option value={20}>Show 20 items</option>
          </select>
        </div>
      </div>
      
      <div className={styles.grid}>
        {currentProducts.length === 0 ? (
          <p>No items</p>
        )
          :
          <>
            {currentProducts.map((product: IProduct) => {                     
              return (                                              
                <div key={product.id}>
                  <ProductItem {...product} />
                </div>
              )
            })}
          </>
        }
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  )
}

export default ProductList