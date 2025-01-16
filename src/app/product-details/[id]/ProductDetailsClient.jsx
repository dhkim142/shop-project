'use client'
import useFetchDocument from '@/hooks/useFetchDocument';
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import styles from './ProductDetails.module.scss'
import Loader from '@/components/loader/Loader';
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating';
import Divider from '@/components/divider/Divider';
import priceFormat from '@/utils/priceFormat';
import listCashIcon from '@/assets/list-cash-icon.png'
import { count } from 'firebase/firestore';
import Button from '@/components/button/Button';


const ProductDetailsClient = () => {

  const { id } = useParams();

  const [count, setCount] = useState(1)

  const { document: product } = useFetchDocument('products', id);         // FetchDocument에서 데이터 가져오기

  const addToCart = () => { };           //장바구니에 담기기
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1))
  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  return (
    <section className={styles.product}>
      {product === null ?
        (<Loader />) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <Image width={477} height={410} src={product.imageURL} alt={product.name} priority />
              </div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <p className={styles.brandName}>
                    {product.brand}
                  </p>
                  <p className={styles.productName}>
                    {product.name}
                  </p>
                  <div className={styles.rating}>
                    <Rating initialValue={0} size={17}/>
                    <span className={styles.count}>(0)</span>
                  </div>
                </div>
                <Divider space={0} />
                <div className={styles.container}>
                  <p className={styles.price}>
                    ${' '}{priceFormat(product.price)}
                  </p>
                  <div className={styles.rewardCashBadge}>
                    <Image src={listCashIcon} alt='cash-icon' width={12} />
                    <span> Up to ${' '}{product.price / 10} rewards </span>
                  </div>
                </div>
                <Divider space={0} />
                <div className={styles.descWrapper}>
                  {product.desc}
                </div>
                <Divider space={0} />
                <div className={styles.bottom}>
                  <p className={styles.price}>
                    ${' '}{product.price * count}
                  </p>
                  <div className={styles.count}>
                    <Button
                      onClick={() => setCount(correntValue => correntValue - 1 )}
                      disabled={count > 1 ? false : true}
                      secondary
                    >
                      -
                    </Button>
                    <p>
                      <b>{count}</b>
                    </p>
                    <Button
                      secondary
                      onClick={() => setCount(correntValue => correntValue + 1 )}
                    >
                      +
                    </Button>

                    <Button
                      onClick={() => addToCart()}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </section>
  )
}

export default ProductDetailsClient