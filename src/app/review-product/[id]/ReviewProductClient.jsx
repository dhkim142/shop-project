'use client'
import React, { useState } from 'react'
import styles from './ReviewProduct.module.scss'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import useFetchDocument from '@/hooks/useFetchDocument';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { selectUserID, selectUserName } from '@/redux/slice/authSlice';
import Heading from '@/components/heading/Heading';
import Loader from '@/components/loader/Loader';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import Button from '@/components/button/Button';
import { db } from '@/firebase/firebase';

const ReviewProductClient = () => {

   const [rate, setRate] = useState(0);
   const [review, setReview] = useState(' ');

   const router = useRouter();

   const {id} = useParams();
   const userID = useSelector(selectUserID);
   const userName = useSelector(selectUserName);
   const{document: product} = useFetchDocument('products', id);
   
   const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toLocaleDateString();

    const reviewData = {
        userID,
        userName,
        productID: id,
        rate,
        review,
        reviewDate: date,
        createdAt: Timestamp.now().toDate()
    }
    try{
        addDoc(collection(db, 'reviews'), reviewData);
        router.push(`/product-details/${id}`);
    }
    catch(error) {
        toast.error(error.message);
    }
   }
  return (
    <section className={styles.review}>
        <Heading title="Customer Reivew" />
        {product === null ? (
            <Loader basic/>
        ) : (
            <div>
                <p>
                    <b>Product name:</b> {product.name}
                </p>
                <Image width={100} height={100} src={product.imageURL} alt={product.name} priority/>
            </div>
        )}
        <div className={styles.card}>
            <form onSubmit={(e) => submitReview(e)}>
                <label>
                    Rating:
                </label>
                <Rating initialValue={rate} onClick={(rate) => setRate(rate)}/>
                <label>
                    Write a Review
                </label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} cols={30} row={10}>
                </textarea>
                <Button type='submit'>
                    Submit
                </Button>
            </form>
        </div>
    </section>
  )
}

export default ReviewProductClient