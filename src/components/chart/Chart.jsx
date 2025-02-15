'use client'
import React from 'react'
import styles from './Chart.module.scss'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { selectOrderHistory } from '@/redux/slice/orderSlice';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const Chart = () => {

  const orders = useSelector(selectOrderHistory)
  const array = []
  orders.map((order) => {
    const { orderStatus } = order
    array.push(orderStatus)
  })

  const getOrderStatusCount = (arr, value) => {
    return arr.filter((n) => n === value).length
  }

  const [x1, x2, x3, x4] = [
    'Approved',
    'Processing',
    'Shipping',
    'Delivered'
  ]

  const placed = getOrderStatusCount(array, x1)
  const processing = getOrderStatusCount(array, x2)
  const shipped = getOrderStatusCount(array, x3)
  const delivered = getOrderStatusCount(array, x4)

  const data = {
    labels: ['Approved', 'Processing', 'Shipping', 'Delivered'],
    datasets: [
      {
        label: 'Order Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <div className={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </div>
    </div>
  )
}

export default Chart