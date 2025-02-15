import { db } from '@/firebase/firebase'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../loader/Loader'
import styles from './ChangeOrderStatus.module.scss'
import Button from '../button/Button'

const ChangeOrderStatus = ({ order, id }) => {

  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const editOrder = (e, id) => {
    e.preventDefault()
    setIsLoading(true)

    const orderData = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate()
    }

    try {
      setDoc(doc(db, 'orders', id), orderData)
      setIsLoading(false)
      toast.success('Completely change the status')
      router.push('/admin/orders')
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <Loader basic />}
      <div className={styles.status}>
        <div className={styles.card}>
          <h4>Update Order Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option disabled value="">
                -- Select --
              </option>
              <option value='Approved'>
                Approved
              </option>
              <option value='Processing'>
                Processing
              </option>
              <option value='Shipping'>
                Shipping
              </option>
              <option value='Delivered'>
                Delivered
              </option>
            </select>
            <div>
              <Button type='submit'>
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangeOrderStatus