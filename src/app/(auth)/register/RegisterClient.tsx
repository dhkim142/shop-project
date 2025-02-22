'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import styles from '../login/Auth.module.scss';
import Link from 'next/link';
import Input from '@/components/Input/Input';
import Button from '@/components/button/Button';
import Divider from '@/components/divider/Divider';
import LogoPath from '@/assets/colorful.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Loader from '@/components/loader/Loader';

const RegisterClient = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cPassword, setCPassword] = useState('');


    const router = useRouter();

    const registerUser = (e: React.FormEvent<HTMLFormElement>) => {                          
        e.preventDefault();
        if (password !== cPassword) {
            return toast.error('Password do not match');
        }
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('user', user);
                setIsLoading(false);

                toast.success('User created successfully');
                router.push('/login');                             
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    }



    return (
        <>
            {isLoading && <Loader />}
            <section className={styles.page}>
                <div className={styles.container}>
                    <h1 className={styles.logo}>
                        <Image src={LogoPath} alt='logo' width={247} />
                    </h1>

                    <form className={styles.form} onSubmit={registerUser}>
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

                        <Input
                            password
                            icon="lock"
                            id="password"
                            name="password"
                            label="Confirm your password"
                            placeholder="Confirm your password"
                            className={styles.control}
                            value={cPassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />

                        <div className={styles.buttonGroup}>
                            <Button
                                type="submit"
                                width="100%"
                            >
                                Sign up
                            </Button>

                            <Divider />

                            <Button
                                width="100%"
                                secondary
                            >
                                <Link href={"/login"}>
                                    Sign in
                                </Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RegisterClient