import Heading from '@/components/heading/Heading'
import React from 'react'
import styles from './CheckoutSuccess.module.scss'
import Button from '@/components/button/Button'
import Link from 'next/link'
import { formatTime } from '@/utils/dayjs'
import priceFormat from '@/utils/priceFormat'

interface ICheckoutSuccessProps {
  searchParams: Promise<{
    orderId: string;
  }>
}

interface IPayment {
  orderName: string;
  orderId: string;
  approvedAt: string;
  card: {
    number: number;
    amount: number;
  }
}

const CheckoutSuccess = async({searchParams}: ICheckoutSuccessProps) => {

  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY

  const params = await searchParams;
  const url = `https://api.tosspayments.com/v1/payments/orders/${params.orderId}`
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8" ).toString('base64')

  const payment: IPayment = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json"
    }
  }).then((response) => {
    return response.json();
  })

  const {card} = payment;

  return (
    <section className={styles.success}>
      <Heading title="Order Success"/>
      <ul className={styles.list}>
        <li><b>Product:</b> {payment.orderName}</li>
        <li><b>Order Number:</b> {payment.orderId}</li>
        <li><b>Card Number:</b> {card ? (card.number) : "N/A"}</li>
        <li><b>Payment Price:</b>${" "} {card ? priceFormat(card.amount) : "N/A"}</li>
        <li><b>Payment Approval Data:</b>{" "}{formatTime(payment.approvedAt)}</li>
      </ul>
      <Button>
        <Link href="/order-history">Order Status</Link>
      </Button>
    </section>
  )
}

export default CheckoutSuccess