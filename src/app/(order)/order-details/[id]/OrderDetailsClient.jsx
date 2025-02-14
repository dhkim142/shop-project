'use client'
import React from 'react'
import styles from './OrderDetails.module.scss'
import { useParams } from 'next/navigation'
import Heading from '@/components/heading/Heading'
import Loader from '@/components/loader/Loader'
import priceFormat from '@/utils/priceFormat'
import Button from '@/components/button/Button'
import { useRouter } from 'next/navigation'
import useFetchDocument from '@/hooks/useFetchDocument'
import Image from 'next/image'

const OrderDetailsClient = () => {

    const { id } = useParams();
    const { document: order } = useFetchDocument("orders", id);

    const router = useRouter();
    const handleClick = (id) => {
        router.push(`/review-product/${id}`)
    }
    return (
        <section className={styles.table}>
            <Heading title="Order Details" />

            {order === null ? (<Loader />) : (
                <>
                    <div className={styles.details}>
                        <p>
                            <b>Order Id:</b> {order.id}
                        </p>
                        <p>
                            <b>Order Price:</b> $ {order.orderAmount}
                        </p>
                        <p>
                            <b>Order Status:</b> {order.orderStatus}
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cartItems.map((cartItem, index) => {
                                    const {id, name, price, imageURL, cartQuantity} = cartItem;
                                    return (
                                        <tr key={id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <p>
                                                    <b>{name}</b>
                                                </p>
                                                <Image src={imageURL} alt={name} width={100} height={100}/>
                                            </td>
                                            <td>
                                                $ {priceFormat(price)}
                                            </td>
                                            <td>
                                                {cartQuantity}
                                            </td>
                                            <td>
                                                $ {priceFormat(price * cartQuantity)}
                                            </td>
                                            <td className={styles.icons}>
                                                <Button onClick={() => handleClick(id)}>
                                                    Product Review
                                                </Button>
                                            </td>
                                        </tr>    
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

        </section>
    )
}

export default OrderDetailsClient