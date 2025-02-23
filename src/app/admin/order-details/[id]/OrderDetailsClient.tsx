'use client'
import React from 'react'
import styles from './OrderDetails.module.scss'
import { useParams } from 'next/navigation'
import Heading from '@/components/heading/Heading'
import ChangeOrderStatus from '@/components/changeOrderStatus/ChangeOrderStatus'
import priceFormat from '@/utils/priceFormat'
import Loader from '@/components/loader/Loader'
import useFetchDocument from '@/hooks/useFetchDocument'
import Image from 'next/image'
import { ICartItem, IOrder } from '@/types'

const OrderDetailsClient = () => {
    const { id } = useParams()
    const { document: order } = useFetchDocument('orders', id as string)
    return (
        <section className={styles.table}>
            <Heading title="Order Detail Information" />

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
                        <p>
                            <b>Address: </b>
                            {order.shippingAddress.line}
                            {" "}
                            {order.shippingAddress.city}
                        </p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.cartItems.map((cartItem: ICartItem, index: number) => {
                                const { id, name, price, imageURL, cartQuantity } = cartItem;
                                return (
                                    <tr key={id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <p>
                                                <b>{name}</b>
                                            </p>
                                            <Image src={imageURL} alt={name} width={100} height={100} />
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
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <ChangeOrderStatus order={order as IOrder} id={id as string}/>
                </>
            )}

        </section>
    )
}

export default OrderDetailsClient