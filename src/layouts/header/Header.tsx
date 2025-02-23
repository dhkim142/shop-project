'use client'
import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { usePathname } from 'next/navigation'
import InnerHeader from '../innerHeader/InnerHeader'
import { useDispatch } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '@/redux/slice/authSlice'
import { useRouter } from 'next/navigation'

const Header = () => {

    const pathname = usePathname()                           //bring the current page path
    const dispatch = useDispatch()
    const router = useRouter()                      

    const [displayName, setdisplayName] = useState('');     

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {                 //Check SignIn status                                         
            if (user) {                                      
                if (user.displayName == null) {
                    const u1 = user.email!.substring(0, user.email!.indexOf('@'))
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setdisplayName(uName)
                }
                else {                                      
                    setdisplayName(user.displayName)
                }
                //save a user information in Redux
                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid
                }))
            }
            else {
                setdisplayName('')
                //remove the user information in Redux
                dispatch(REMOVE_ACTIVE_USER());
            }
        })
    }, [dispatch, displayName])

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                toast.success('Logout successfully')
                router.push('/')
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    if (pathname === '/login' || pathname === '/register' || pathname === '/reset') {            //Don't display the Header on the LogIn, SignUp, passward reset page
        return null;
    }

    return (
        <header>
            <div className={styles.loginBar}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link href={"/login"}>
                            Sign In
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/admin/dashboard"}>
                            Administrator
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/order-history"}>
                            Order
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"} onClick={logoutUser}>
                            Sign Out
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"}>
                            AffiliateMarketing
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"}>
                            DHSHOP-play
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link href={"/"}>
                            CustomerService
                        </Link>
                    </li>
                </ul>
            </div>
            {
                pathname.startsWith('/admin') ? null : <InnerHeader />          //Don't display the innerheader on the administrator page
            }
        </header>
    )
}

export default Header