'use client'
import React from 'react'
import styles from './Checkout.module.scss'
import Heading from '@/components/heading/Heading'
import Button from '@/components/button/Button'
import CheckoutForm from '@/components/checkoutForm/CheckoutForm'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_CART, selectCartItems, selectCartTotalAmount } from '@/redux/slice/cartSlice'
import { selectEmail, selectUserID } from '@/redux/slice/authSlice'
import { selectShippingAddress } from '@/redux/slice/checkoutSlice'
import { db } from '@/firebase/firebase'
import { useRouter } from 'next/navigation'
import { loadTossPayments } from '@tosspayments/payment-sdk'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

const CheckoutClient = () => {

    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const userID = useSelector(selectUserID);
    const cartItems = useSelector(selectCartItems);
    const shippingAddress = useSelector(selectShippingAddress);
    const userEmail = useSelector(selectEmail);
    
    const router = useRouter();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tossPayment = await loadTossPayments (
            process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY
        )

        tossPayment.requestPayment('Card', {
            amount: cartTotalAmount,
            orderId: Math.random().toString(32).slice(2),
            orderName: "Order"
        })
        .then(async function(data) {
            // success : call the payment approval API
            const { orderId, paymentKey, amount } = data;
            const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY

            const url = 'https://api.tosspayments.com/v1/payments/confirm'
            const basicToken = Buffer.from(`${secretKey}:`, "utf-8" ).toString('base64');

            const confirmResponse = fetch(url, {
                method: "post",
                body: JSON.stringify({
                    amount,
                    orderId,
                    paymentKey
                }),
                headers: {
                    Authorization: `Basic ${basicToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json());

            console.log('confirmResponse', confirmResponse);

            const today = new Date();
            const date = today.toDateString();
            const time = today.toLocaleDateString();
            
            const orderData = {
                userID,
                userEmail,
                orderDate: date,
                orderTime: time,
                orderAmount: amount,
                orderStatus: "Approved",
                cartItems,
                shippingAddress,
                createdAt: Timestamp.now().toDate()
            }

            await addDoc(collection(db, 'orders'), orderData);
            dispatch(CLEAR_CART());
            router.push(`/checkout-success?orderId=${orderId}`);

        })
        .catch((error) => {
            if(error.code === "USER_CANCEL") {
                // remove the payment popup before finish it
                toast.error('The payment popup closed')
            }
            else if (error.code === "INVALID_CARD_COMPANY") {
                // invalid card code
            }
        })
    }

  return (
    <section>
        <div className={styles.checkout}>
            <Heading title='Order'/>
            <form onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <CheckoutForm />
                </div>
                <div>
                    <Button type='submit'>
                        Pay with Toss
                    </Button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default CheckoutClient