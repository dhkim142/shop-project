'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './CheckoutAddress.module.scss'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '@/redux/slice/checkoutSlice'
import Heading from '@/components/heading/Heading'
import Button from '@/components/button/Button'

const initialAddressState = {
    name: '',
    line: '',
    city: '',
    country: '',
    postalCode: ''
}

const ChckoutAddressClient = () => {

    const [shippingAddress, setShippingAddress] = useState({
        ...initialAddressState
    })

    const [billingAddress, setBillingAddress] = useState({
        ...initialAddressState
    })

    const dispatch = useDispatch();
    const router = useRouter();

    const handleShipping = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setShippingAddress({...shippingAddress, [name]: value})
    }

    const handleBilling = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBillingAddress({...billingAddress, [name]: value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(SAVE_BILLING_ADDRESS(billingAddress));
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
        router.push('/checkout');
    }
  return (
    <section className={styles.checkout}>
        <Heading title='Order Details' />
        <form onSubmit={handleSubmit}>
            <div className={styles.card}>
                <h3>Shipping Address</h3>
                <label>Recipient Name</label>
                <input 
                    type='text'
                    placeholder='Recipient Name'
                    required
                    name='name'
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                />

                <label>Street Address</label>
                <input 
                    type='text'
                    placeholder='Street Address'
                    required
                    name='line'
                    value={shippingAddress.line}
                    onChange={(e) => handleShipping(e)}
                />

                <label>City</label>
                <input 
                    type='text'
                    placeholder='City'
                    required
                    name='city'
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                />

                <label>Country</label>
                <input 
                    type='text'
                    placeholder='Country'
                    required
                    name='country'
                    value={shippingAddress.country}
                    onChange={(e) => handleShipping(e)}
                />

                <label>Postal Code</label>
                <input 
                    type='text'
                    placeholder='Postal Code'
                    required
                    name='postalCode'
                    value={shippingAddress.postalCode}
                    onChange={(e) => handleShipping(e)}
                />
            </div>

            <div className={styles.card}>
                <h3>Billing Address</h3>
                <label>Sender Name</label>
                <input 
                    type='text'
                    placeholder='Sender Name'
                    required
                    name='name'
                    value={billingAddress.name}
                    onChange={(e) => handleBilling(e)}
                />

                <label>Street Address</label>
                <input 
                    type='text'
                    placeholder='Street Address'
                    required
                    name='line'
                    value={billingAddress.line}
                    onChange={(e) => handleBilling(e)}
                />

                <label>City</label>
                <input 
                    type='text'
                    placeholder='City'
                    required
                    name='city'
                    value={billingAddress.city}
                    onChange={(e) => handleBilling(e)}
                />

                <label>Country</label>
                <input 
                    type='text'
                    placeholder='Country'
                    required
                    name='country'
                    value={billingAddress.country}
                    onChange={(e) => handleBilling(e)}
                />

                <label>Postal Code</label>
                <input 
                    type='text'
                    placeholder='Postal Code'
                    required
                    name='postalCode'
                    value={billingAddress.postalCode}
                    onChange={(e) => handleBilling(e)}
                />

                <Button type='submit'>
                    Pay Now
                </Button>
            </div>
        </form>
    </section>
  )
}

export default ChckoutAddressClient