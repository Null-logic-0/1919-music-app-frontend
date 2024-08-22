'use client';
import { useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import styles from './LogOut.module.scss';
import Button from '../Button/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/app/helpers/authState';

const Logout = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [auth, setAuth] = useRecoilState(authState);
    const router = useRouter();

    const handleOpen = () => {
        setShowDetails(prev => !prev);
    };

    const handleLogout = () => {
        const accessToken = localStorage.getItem('accesstoken ');

        if (!accessToken) {
            router.push('/auth');
            return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const response = axios.post(
            'https://one919-backend.onrender.com/auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        ).then(() => {
            localStorage.removeItem('accesstoken')
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('auth');

            setAuth({
                isAuthenticated: false,
                user: null,
            });
            router.push('/auth')
        })
    };

    return (
        <div className={styles.main}>
            <div className={styles.fixed}>
                <MultiTaskButton icon='/Icons/Logout.svg' onclick={handleOpen} />
            </div>

            {showDetails && (
                <div className={styles.container}>
                    <p className={styles.text}>Do you want to Log-Out?</p>
                    <div className={styles.button}>
                        <div className={styles.buttonSize}>
                            <Button text='Yes' borders='small' onclick={handleLogout} />

                        </div>
                        <div className={styles.buttonSize}>
                            <Button text='No' borders='small' color='color' onclick={handleOpen} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
