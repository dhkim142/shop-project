import { selectFilteredProducts, SORT_PRODUCTS } from '@/redux/slice/filterSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductList.module.scss'
import Pagination from '@/components/pagination/Pagination'
import ProductItem from '../productItem/ProductItem'

const ProductList = () => {

  const [sort, setSort] = useState('latest');

  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products: filteredProducts, sort }))      //필터링 된 상품중에서 가격순으로 sort
  }, [dispatch, sort]);

  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(10)

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const isRadioSelected = (value) => sort === value;                    //같은 그룹의 버튼 중 하나만 선택하도록 하기위해 Radio 함수 사용
  const handleRadioClick = (e) => setSort(e.target.value);

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
              <label htmlFor='latest'>Latest</label>                    {/* id를 가진 폼(input) 요소와 연결가능하도록 htmlFor함수 사용, label 클릭 시 활성화 */}
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
            {currentProducts.map((product) => {                     //map을 사용해서 product를 순회하며 가져오기 떄문에 여러개의 div가 생기고, 그것을 관리하게위해 빈<>를 사용
              return (                                              //가져온 데이터를 각각 div로 return하는이유는 각각의 독립적인 블록이 필요하기 떄문에 사용
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