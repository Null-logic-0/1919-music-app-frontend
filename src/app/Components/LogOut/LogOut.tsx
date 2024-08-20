'use client';
import { useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import styles from './LogOut.module.scss';
import Button from '../Button/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/app/helpers/authState';
import { access } from 'fs';

const Logout = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [auth, setAuth] = useRecoilState(authState);
    const router = useRouter();

    const handleOpen = () => {
        setShowDetails(prev => !prev);
    };

    const handleLogout = async () => {
        try {
            console.log('Sending logout request...');
            const response = await axios.post('https://one919-backend.onrender.com/auth/logout', {}, {
                withCredentials: true,
            });

            console.log('Logout response:', response);

            if (response.status === 200 || response.status === 201) {
                console.log('Logout successful:', response);

                setAuth({
                    isAuthenticated: false,
                    user: null,
                });

                localStorage.removeItem('auth');
                router.push('/auth');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Logout failed:', error);
            
        }
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
                        <Button text='Yes' size='inline' borders='small' onclick={handleLogout} />
                        <Button text='No' size='inline' borders='small' color='changed' onclick={handleOpen} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
