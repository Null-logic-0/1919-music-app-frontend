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

const AuthForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<loginInterface>();
    const router = useRouter();
    const [auth, setAuth] = useRecoilState(authState); 

    const submitLogin = async (values: loginInterface) => {
        try {
            const response = await axios.post('https://one919-backend.onrender.com/auth/login', values);

            console.log('Login successful', response.data);

            if (response.status === 200 || response.status === 201) {
                setAuth({
                    isAuthenticated: true,
                    user: response.data.user,
                });

                localStorage.setItem('auth', JSON.stringify({
                    isAuthenticated: true,
                    user: response.data.user,
                }));

                router.push('/');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Login failed', error);
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
                    
                    <Toggle setIsChecked={function (value: boolean): void { }} text='Remember me' />
                </div>

                <Button text='Log in' size='inline' />
                
                <div className={styles.container}>
                    <Link href='/register' className={styles.link}>Don&apos;t have an account?</Link>
                    <span className={styles.link}>Sign Up For 1919</span>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
