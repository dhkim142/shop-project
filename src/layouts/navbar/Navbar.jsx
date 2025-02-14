import React from 'react'
import styles from './Navbar.module.scss'
import { FaUserCircle } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import { selectUserName } from '@/redux/slice/authSlice'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const pathname = usePathname()
  const userName = useSelector(selectUserName)
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/admin/dashboard' className={pathname === '/admin/dashboard' ? `${styles.active}` : ''}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link href='/admin/all-products' className={pathname === '/admin/all-products' ? `${styles.active}` : ''}>
              Total Products
            </Link>
          </li>
          <li>
            <Link href='/admin/add-product' className={pathname === '/admin/add-product' ? `${styles.active}` : ''}>
              Add Product
            </Link>
          </li>
          <li>
            <Link href='/admin/orders' className={pathname === '/admin/orders' ? `${styles.active}` : ''}>
              Order
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar