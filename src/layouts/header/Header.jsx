'use client'
import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { usePathname } from 'next/navigation'
import InnerHeader from '../innerHeader/InnerHeader'
import { useDispatch } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '@/redux/slice/authSlice'

const Header = () => {

    const pathname = usePathname()                          //현재 페이지 경로 가져오기
    const dispatch = useDispatch()                           //리덕스 디스패치 함수 가져오기

    const [displayName, setdisplayName] = useState('');     //로그인한 사용자의 이름을 저장할 상태 변수

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {                //로그인 상태 확인 (로그인->로그아웃, 로그아웃->로그인)                                            
            if (user) {                                      //직접 로그인
                if (user.displayName == null) {
                    const u1 = user.email.substring(0, user.email.indexOf('@'))
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setdisplayName(uName)
                }
                else {                                      //구글 로그인
                    setdisplayName(user.displayName)
                }
                //유저 정보를 리덕스 스토어에 저장
                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid
                }))
            }
            else {
                setdisplayName('')
                //유저 정보를 리덕스 스토어에서 제거
                dispatch(REMOVE_ACTIVE_USER());
            }
        })
    }, [dispatch, displayName])
    // 빈 배열은은 컴포넌트가 처음 렌더링 될 때만 실행, onAuthStateChanged는 Firebase Authentication의 상태 변화를 감지하는 함수로, 
    // 한 번만 등록하면 상태 변화(로그인 ↔ 로그아웃)를 계속해서 실시간으로 감지함
    // 따라서 useEffect가 최초 렌더링 시에만 실행되면 이후 상태 변화는 onAuthStateChanged 내부의 콜백 함수로 처리됨.

    const logoutUser = (e) => {
        SignOut(auth)
            .the(() => {
                toast.success('Logout successful')
                Router.push('/')
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    if (pathname === '/login' || pathname === '/register' || pathname === '/reset') {            //로그인, 회원가입, 비밀번호 재설정 페이지에서는 헤더를 보여주지 않음
        return null;
    }

    return (
        <header>
            <div className={styles.loginBar}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link href={"/login"}>
                            Sige In
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
                pathname.startsWith('/admin') ? null : <InnerHeader />          //관리자 페이지에서는 InnerHeader를 보여주지 않음
            }
        </header>
    )
}

export default Header