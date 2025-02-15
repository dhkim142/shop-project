'use client'
import React, { useEffect } from 'react'
import styles from './Dashboard.module.scss'
import { AiFillDollarCircle } from 'react-icons/ai'
import { FaCartArrowDown } from 'react-icons/fa'
import { BsCart4 } from 'react-icons/bs'
import useFetchCollection from '@/hooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS } from '@/redux/slice/productSlice'
import { CALCULATE_TOTAL_ORDER_AMOUNT, selectOrderHistory, selectTotalOrderAmount, STORE_ORDERS } from '@/redux/slice/orderSlice'
import Heading from '@/components/heading/Heading'
import InfoBox from '@/components/InfoBox/InfoBox'
import priceFormat from '@/utils/priceFormat'
import Chart from '@/components/chart/Chart'

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />
const productIcon = <BsCart4 size={30} color='#1f93ff' />
const ordersIcon = <FaCartArrowDown size={30} color="#4385F4" />


const DashboardClient = () => {

    const dispatch = useDispatch()
    const products = useFetchCollection('products')
    const { data } = useFetchCollection('orders')
    const totalOrderAmount = useSelector(selectTotalOrderAmount)
    const orders = useSelector(selectOrderHistory)

    useEffect(() => {
        dispatch(
            STORE_PRODUCTS({
                products: products.data
            })
        )
        dispatch(
            STORE_ORDERS(data)
        )
        dispatch(
            CALCULATE_TOTAL_ORDER_AMOUNT()
        )
    }, [dispatch, data, products])

    return (
        <div className={styles.home}>
            <Heading title='Administrator Dashboard' />
            <div className={styles.infoBox}>
                <InfoBox
                    cardClass={`${styles.card} ${styles.card1}`}
                    title={'Profit'}
                    count={`$ ${priceFormat(Number(totalOrderAmount))}`}
                    icon={earningIcon}
                />
                <InfoBox
                    cardClass={`${styles.card} ${styles.card2}`}
                    title={'Total Products'}
                    count={`${products.data.length}`}
                    icon={productIcon}
                />
                <InfoBox
                    cardClass={`${styles.card} ${styles.card3}`}
                    title={'Total Orders'}
                    count={`${orders.length}`}
                    icon={ordersIcon}
                />
            </div>
            <div>
                <Chart />
            </div>
        </div>
    )
}

export default DashboardClient