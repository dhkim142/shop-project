'use client'
import useFetchCollection from '@/hooks/useFetchCollection'
import { selectOrderHistory, STORE_ORDERS } from '@/redux/slice/orderSlice'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Orders.module.scss'
import Loader from '@/components/loader/Loader'
import { formatTime } from '@/utils/dayjs'
import priceFormat from '@/utils/priceFormat'
import Heading from '@/components/heading/Heading'

const OrdersClient = () => {

    const {data, isLoading} = useFetchCollection('orders')
    const dispatch = useDispatch()
    const router = useRouter()
    const orders = useSelector(selectOrderHistory)
    useEffect(() => {
        dispatch(STORE_ORDERS(data))
    }, [dispatch, data])

    const handleClick = (id) => {
        router.push(`/admin/order-details/${id}`)
    }
  return (
    <div className={styles.order}>
        <Heading title="Order Histoey" subtitle="Change Order Status" />
        <>
            {isLoading && <Loader basic/>}
            <div className={styles.table}>
                {orders.length === 0 ? (
                    <p>No orderhistory</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Date</th>
                                <th>ID</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => {
                                const {id, orderDate, orderAmount, orderStatus} = order;
                                return (
                                    <tr key={id} onClick={() => handleClick(id)}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {formatTime(orderDate)}
                                        </td>
                                        <td>
                                            {id}
                                        </td>
                                        <td>
                                            ${" "}{priceFormat(orderAmount)}
                                        </td>
                                        <td>
                                            <p className={orderStatus !== "Delivered" ? `${styles.pending}` : `${styles.delivered}`}>
                                                {orderStatus}
                                            </p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}

            </div>
        </>
    </div>
  )
}

export default OrdersClient