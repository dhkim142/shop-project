'use client'
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import styles from '../login/Auth.module.scss';
import Link from 'next/link';
import Input from '@/components/Input/Input';
import Button from '@/components/button/Button';
import Divider from '@/components/divider/Divider';
import LogoPath from '@/assets/colorful.svg';
import Image from 'next/image';

const RegisterClient = () => {


    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cPassword, setcPassword] = useState('');


    const router = useRouter();

    const registerUser = (e) => {                          //로그인 버튼 클릭 후 호출 함수 (인증)
        e.preventDefault();
        setIsLoading(true);
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
                            label="Cirform your password"
                            placeholder="Cirnfirm your password"
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