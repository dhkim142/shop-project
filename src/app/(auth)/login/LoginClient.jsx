'use client'
import Image from 'next/image';
import React, { useState } from 'react'

import LogoPath from '@/assets/colorful.svg';
import { useRouter } from 'next/navigation';

import styles from './Auth.module.scss';
import Loader from '@/components/loader/Loader';
import Input from '@/components/Input/Input';


const LoginClient = () => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAutoLogin, setisAutoLogin] = useState(false);

    const router = useRouter();

    const redirectUser = () => {
        router.push('/');                               //로그인 후 홈페이지로 이동
    }

    const loginUser = (e) => {                          //로그인 버튼 클릭 후 호출 함수 (인증)
        e.preventDefault();
        setIsLoading(true);
    }

    const signInWithGoogle = () => {                    //Google 로그인 이용(인증)

    }

    return (
        <>
            <Loader />
            <section className={styles.page}>
                <div className={styles.container}>
                    <h1 className={styles.logo}>
                        <Image src={LogoPath} alt='logo' width={247} />
                    </h1>

                    <form className={styles.form} onSubmit={loginUser}>
                        {/* Input */}
                        <Input 
                            email
                            icon="letter"
                            id="email"
                            name="email"
                            label="email"
                            placeholder="Please enter your email"
                            className={styles.control}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input 
                            password
                            icon="lock"
                            id="password"
                            name="password"
                            label="password"
                            placeholder="Please enter your password"
                            className={styles.control}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={styles.group}>
                            {/* 자동 로그인, 비밀번호 수정 */}
                            자동 로그인, 비밀번호 수정
                        </div>

                        <div className={styles.buttonGroup}>
                            {/* Button */}
                            Button
                            <div>
                                {/*Button */}
                                Button
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginClient