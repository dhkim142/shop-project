import { FILTER_BY } from '@/redux/slice/filterSlice'
import { selectMaxPrice, selectMinPrice, selectProducts } from '@/redux/slice/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ProductFilter.module.scss'
import priceFormat from '@/utils/priceFormat'
import Button from '@/components/button/Button'


const ProductFilter = () => {

  const [category, setCategory] = useState('All')
  const [brand, setBrand] = useState('All')
  const [price, setPrice] = useState('10000')

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category))           //All을 눌렀을 때 Redux store에 배열된 모든 products를 가져옴
  ]

  const filterCategories = (category) => {                            //filter된 상품만 보여줌
    setCategory(category);                                            //filter된 카테고리로 업데이트
  }

  const allBrands = [
    'All',
    ...new Set(products.map((product) => product.brand))              //brand filter
  ]

  const clearFilters = () => {                                         //filter 초기화 
    setCategory("All");
    setBrand('All');
    setPrice(maxPrice);
  }

  useEffect(() => {
    dispatch(FILTER_BY({ products, price, brand, category }))        //이벤트 발생을 한번에 처리하는 코드
  }, [dispatch, products, price, brand, category])


  return (
    <div className={styles.filter}>
      <h4>Category</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {                            // 카테고리를 인덱스 순서로 순회
          return (
            <button 
              key={cat} 
              type='button' 
              className={`${category}` === cat ? `${styles.active}` : ''}
              onClick={() => filterCategories(cat)}
            >
              &#8250; {cat}                                             {/* &#8250;: 카테고리 이름 옆 화살표 */}
            </button>
          )
        })}
      </div>

      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand) => {
            return (
              <option value={brand} key={brand}>
                {brand}
              </option>
            )
          })}
        </select>
      </div>

      <h4>Price</h4>
      <p>$ {priceFormat(Number(price))} </p>                               {/* price에 단위에 맞게 값을 보기쉽게 만들어 주는 format을 적용(Number타입)*/}
      <div className={styles.price}>
        <input
          type='range'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <br />
      <Button onClick={clearFilters}>
          Reset filter
      </Button>
    </div>
  )
}

export default ProductFilter