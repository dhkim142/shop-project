import React from 'react'
import styles from './ProductItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat'
import { Rating } from 'react-simple-star-rating'
import rocketBadgeIcon from '@/assets/badge-rocket.svg'
import useFetchDocuments from '@/hooks/useFetchDocuments'

const ProductItem = ({id, name, price, imageURL}) => {

  const {documents} = useFetchDocuments('reviews', ["productID", "==", id])     //리뷰에있는 productID와 현재상품의 id를 비교

  let productRating = 0;

  documents.map(doc => {                                                        // rating 평균
    productRating = productRating + doc.rate;
  })

  const rating = productRating / document.length;

  const shortenText = (text, n) => {
    if(text.lenght > n) {
      const shortenedText = text.substring(0, n).concat('...')
      return shortenedText
    }
    return text;
  }
  return (
    <div className={styles.grid}>
      <Link href={'/product-details/${id}'}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265}/>
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            ${" "}<strong style={{color: '#cb1400'}}>{priceFormat(price)}</strong>
           {" "}<Image src={rocketBadgeIcon} alt='RocketDelivery'/> 
          </em>
          <div className={styles.rating}>
            <Rating
              size={17}
              readonly
              initialValue={Number.isNaN(rating) ? 0 : rating}                                           //리뷰가 없을 시 Not a number표시되기때문에 isNaN을 이용해서 0로 표시
            />
            <span className={styles.ratingCount}>
              ({documents.length})
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductItem