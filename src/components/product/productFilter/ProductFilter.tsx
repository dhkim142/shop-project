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
  const [price, setPrice] = useState(10000)

  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    'All',
    ...new Set(products.map((product) => product.category))           //you can look whole product when you click the 'All'
  ]

  const filterCategories = (category: string) => {                            //you can see the filtered product
    setCategory(category);
  }

  const allBrands = [
    'All',
    ...new Set(products.map((product) => product.brand))              //brand filter
  ]

  const clearFilters = () => {                                         //filter initialization
    setCategory("All");
    setBrand('All');
    setPrice(maxPrice);
  }

  useEffect(() => {
    dispatch(FILTER_BY({ products, price, brand, category }))        
  }, [dispatch, products, price, brand, category])


  return (
    <div className={styles.filter}>
      <h4>Category</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {                            
          return (
            <button 
              key={cat} 
              type='button' 
              className={`${category}` === cat ? `${styles.active}` : ''}
              onClick={() => filterCategories(cat)}
            >
              &#8250; {cat}                                             {/* &#8250; : Arrow next to category */}
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
      <p>$ {priceFormat(Number(price))} </p>                               
      <div className={styles.price}>
        <input
          type='range'
          value={price}
          onChange={(e) => setPrice(e.target.valueAsNumber)}
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