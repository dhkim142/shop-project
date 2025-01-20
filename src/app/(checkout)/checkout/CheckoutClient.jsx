'use client'
import React from 'react'
import styles from './Checkout.module.scss'
import Heading from '@/components/heading/Heading'
import Button from '@/components/button/Button'
import CheckoutForm from '@/components/checkoutForm/CheckoutForm'

const CheckoutClient = () => {

    const handleSubmit = () => {

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