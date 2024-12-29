'use client'
import React, { useState } from 'react'
import styles from './Reset.module.scss'
import Loader from '@/components/loader/Loader';
import Heading from '@/components/heading/Heading';
import Button from '@/components/button/Button';
import Link from 'next/link';
import Input from '@/components/Input/Input';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const ResetClient = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setisLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        setisLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setisLoading(false);
                toast.success("A password reset link has been sent to your email");
            })
            .catch((error) => {
                setisLoading(false);
                toast.error(error.message);
            })
    }
    return (
        <>
            {isLoading && <Loader />}
            <section className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <Heading
                            title="Reset password"
                            subtitle="Please enter your email"
                        />

                        <form onSubmit={resetPassword}>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                className={styles.control}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div>
                                <Button type='submit'>
                                    Reset
                                </Button>
                            </div>

                            <div className={styles.links}>
                                <p>
                                    <Link href='/login'>-Sign in</Link>
                                </p>
                                <p>
                                    <Link href='/login'>-Sign up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}

export default ResetClient