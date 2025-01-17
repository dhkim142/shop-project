import React from 'react'
import styles from './ProductReviewItem.module.scss'
import { Rating } from 'react-simple-star-rating'
import { formatTime } from '@/utils/day'

export const ProductReviewItem = ({
    rate,
    review,
    reviewDate,
    userName
}) => {
  return (
    <div className={styles.review}>
        <p className={styles.writer}>
            {userName} <span>'s review</span>
        </p>
        <Rating 
            initialValue={rate} readonly size={25}
        />
        <p className={styles.content}>
            {review}
        </p>
        <p className={styles.date}>
            {formatTime(reviewDate)}
        </p>
    </div>
  )
}
