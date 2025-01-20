import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '@/redux/slice/cartSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CheckoutForm.module.scss'
import Link from 'next/link';
import priceFormat from '@/utils/priceFormat';

const CheckoutForm = () => {

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  },[dispatch, cartItems])

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  return (
    <div className={styles.summary}>
      <h3>Order Summary</h3>
      <div>
        {
          cartItems.length === 0 ? (
            <>
              <p>No items in your cart</p>
              <Link href='/'>Go to homepage</Link>
            </>
          ) : (
            <>
             <div>
              {cartItems.map((item) => {
                const {id, name, price, cartQuantity} = item
                return (
                  <div key={id} className={styles.card}>
                    <p><b>Item: </b>{name}</p>
                    <p><b>Quantity: </b>{cartQuantity}</p>
                    <p><b>Price: </b>${" "}{priceFormat(price)}</p>
                    <p><b>Total Price: </b>{priceFormat(price * cartQuantity)}</p>
                  </div>
                )
              })}

              <div className={styles.text}>
                <p><b>Total Items:{" "}</b>{cartTotalQuantity}</p>
              </div>

              <div className={styles.text}>
                <p><b>Total Price:{" "}</b>${" "}{priceFormat(cartTotalAmount)}</p>
              </div>
             </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default CheckoutForm