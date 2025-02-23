'use client'
import React, { useEffect } from 'react'
import styles from './OrderHistory.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrderHistory, STORE_ORDERS } from '@/redux/slice/orderSlice'
import { selectUserID } from '@/redux/slice/authSlice'
import Heading from '@/components/heading/Heading'
import Loader from '@/components/loader/Loader'
import { formatTime } from '@/utils/dayjs'
import priceFormat from '@/utils/priceFormat'
import { useRouter } from 'next/navigation'

const OrderHistoryClient = () => {

    const {data, isLoading} = useFetchCollection('orders')
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(STORE_ORDERS(data));
    },[dispatch, data])

    const orders = useSelector(selectOrderHistory)
    const userID = useSelector(selectUserID);

    const filteredOrders = orders.filter((order) => order.userID === userID);
    const handleClick = (id: string) => {
        router.push(`/order-details/${id}`)
    }

  return (
    <section className={styles.order}>
        <Heading title="Order list" />
        {isLoading && <Loader />}
        <div className={styles.table}>
            {
                filteredOrders.length === 0 ? (
                    <p>No order list</p>
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
                            {filteredOrders.map((order, index) => {
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
                )
            }
        </div>
    </section>
  )
}

export default OrderHistoryClient