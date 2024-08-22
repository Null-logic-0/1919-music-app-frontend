'use client';

import classNames from 'classnames';
import Input from '../Input/Input';
import styles from './AuthForm.module.scss';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import Link from 'next/link';
import Image from 'next/image';
import { loginInterface } from '@/app/interfaces/login.interface';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authState } from '@/app/helpers/authState';
import { useState, useEffect } from 'react';
import Spinner from '../LoadingSpiner/Spiner';

const AuthForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm<loginInterface>();
    const router = useRouter();
    const [auth, setAuth] = useRecoilState(authState);
    const [isChecked, setIsChecked] = useState(false);
    const [savedEmail, setSavedEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('savedEmail');
        const password = localStorage.getItem('savedPassword');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';

        if (email && password && rememberMe) {
            setValue('email', email);
            setValue('password', password);
            setIsChecked(rememberMe);
            setSavedEmail(email);
        }
    }, [setValue]);

    const handleLoginSuccess = (data: any) => {
        const { access_token, refresh_token, role } = data;

        localStorage.setItem('auth', JSON.stringify({
            isAuthenticated: true,
            accessToken: access_token,
            refreshToken: refresh_token,
            role: role,
        }));

        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        setAuth({
            isAuthenticated: true,
            role: role,
        });

        router.push('/');
        localStorage.setItem('accesstoken', access_token);
    };

    const submitLogin = async (values: loginInterface) => {
        setLoading(true);


        try {
            if (isChecked) {
                localStorage.setItem('savedEmail', values.email);
                localStorage.setItem('savedPassword', values.password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('savedEmail');
                localStorage.removeItem('savedPassword');
                localStorage.removeItem('rememberMe');
            }

            const { data, status } = await axios.post('https://one919-backend.onrender.com/auth/login', values);

            if (status === 200 || status === 201) {
                handleLoginSuccess(data);
            } 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.main}>
            <Image src='/Icons/Logo.svg' alt='logo' width={100} height={105} />
            <p className={styles.title}>Log in to TnNdshN</p>

            <form className={styles.form} onSubmit={handleSubmit(submitLogin)}>
                <div className={styles.inputs}>
                    <Input
                        type='email'
                        text='Enter your E-mail'
                        className={classNames({ [styles.inputError]: errors.email })}
                        {...register('email', {
                            required: 'E-mail is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Entered value does not match E-mail format'
                            }
                        })}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                    <Input
                        type='password'
                        showHideButton
                        text='Password'
                        className={classNames({ [styles.inputError]: errors.password })}
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        })}
                    />
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}

                    <Toggle text='Remember me' isChecked={isChecked} setIsChecked={setIsChecked} />
                </div>

                <Button text={loading ? 'Logging in...' : 'Log in'} disabled={loading} />

                <div className={styles.container}>
                    <Link href='/register' className={styles.link}>
                        Don&apos;t have an account?
                    </Link>
                    <Link href='/' className={styles.link}>
                        {savedEmail ? `Sign Up For ${savedEmail}` : ''}
                    </Link>
                </div>
            </form>

            {loading && (
                <div className={styles.background}>
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default AuthForm;
