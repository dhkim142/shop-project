'use client'
import Image from 'next/image';
import React, { useState } from 'react'

import LogoPath from '@/assets/colorful.svg';
import { useRouter } from 'next/navigation';

import styles from './Auth.module.scss';
import Loader from '@/components/loader/Loader';
import Input from '@/components/Input/Input';
import AutoSignInCheckbox from '@/components/autoSignInCheckbox/AutoSignInCheckbox';
import Divider from '@/components/divider/Divider';
import Button from '@/components/button/Button';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const LoginClient = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAutoLogin, setisAutoLogin] = useState(false);

    const router = useRouter();

    const redirectUser = () => {
        router.push('/');                               
    }

    const loginUser = (e: React.FormEvent<HTMLFormElement>) => {                          
        e.preventDefault();
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(false);
                toast.success('User login successfully');
                redirectUser();                             
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            })
    }

    const signInWithGoogle = () => {                    // google authentication
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                toast.success('User login successfully');
                redirectUser();                             
            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    return (
        <>
            {isLoading && <Loader />}
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
                            <AutoSignInCheckbox
                                checked={isAutoLogin}
                                onChange={(e) => setisAutoLogin(e.target.checked)}
                            />
                            <Link href={'/reset'} className={styles.findLink}>
                                Change password
                                <svg width="11"
                                    height="18"
                                    viewBox="0 0 11 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={styles.findLinkArrow}
                                >

                                    <path d="M1.5 1L9.5 9L1.5 17" stroke="#0074E9" strokeWidth="2" />
                                </svg>
                            </Link>

                        </div>

                        <div className={styles.buttonGroup}>
                            <Button
                                type="submit"
                                width="100%"
                            >
                                Sign in
                            </Button>

                            <Divider />

                            <Button
                                width="100%"
                                secondary
                            >
                                <Link href={"/register"}>
                                    Sign up
                                </Link>
                            </Button>

                            <Divider />

                            <div>
                                <Button
                                    onClick={signInWithGoogle}
                                >
                                    Google Sign in
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginClient