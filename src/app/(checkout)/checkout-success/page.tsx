import Heading from '@/components/heading/Heading'
import React from 'react'
import styles from './CheckoutSuccess.module.scss'
import Button from '@/components/button/Button'
import Link from 'next/link'
import { formatTime } from '@/utils/dayjs'
import priceFormat from '@/utils/priceFormat'

interface IPayment {
  orderName: string;
  orderId: string;
  approvedAt: string;
  card: {
    number: number;
    amount: number;
  }
}

// 인라인으로 props 타입 지정
export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: { orderId: string }
}) {
  if (!searchParams.orderId || typeof searchParams.orderId !== 'string') {
    return <p>Invalid order ID.</p>;
  }

  const secretKey = process.env.TOSS_SECRET_KEY; // NEXT_PUBLIC_ 없이 사용
  if (!secretKey) {
    console.error("TOSS_SECRET_KEY is not defined");
    return <p>Payment processing error. Please contact support.</p>;
  }

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  let payment: IPayment | null = null;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch payment data: ${response.statusText}`);
    }

    payment = await response.json();
  } catch (error) {
    console.error("Error fetching payment data:", error);
    return <p>Failed to load payment details.</p>;
  }

  if (!payment) {
    return <p>Payment details not found.</p>;
  }

  const { card } = payment;

  return (
    <section className={styles.success}>
      <Heading title="Order Success"/>
      <ul className={styles.list}>
        <li><b>Product:</b> {payment.orderName}</li>
        <li><b>Order Number:</b> {payment.orderId}</li>
        <li><b>Card Number:</b> {card ? priceFormat(card.amount) : "N/A"}</li>
        <li><b>Payment Price:</b>${" "} {card ? priceFormat(card.amount) : "N/A"}</li>
        <li><b>Payment Approval Data:</b>{" "}{formatTime(payment.approvedAt)}</li>
      </ul>
      <Button>
        <Link href="/order-history">Order Status</Link>
      </Button>
    </section>
  )
}