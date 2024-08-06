'use client'
import classNames from 'classnames';
import Input from '../Input/Input';
import styles from './AuthForm.module.scss';
import { RegisterFormInterface } from '@/app/interfaces/Register.interface';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Toggle from '../Toggle/Toggle';
import Link from 'next/link';


const AuthForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInterface>();

    const submitRegister = (values: RegisterFormInterface) => {
        console.log('values', values);
    }
    return (
        <div className={styles.main}>
            <h1 className={styles.logo}>TnNdshN</h1>
            <p className={styles.title}>Login in to TnNdshN</p>


            <form className={styles.form} onSubmit={handleSubmit(submitRegister)}>
                <div className={styles.inputs}>
                    <Input
                        type='email'
                        text='Enter your E-mail?'
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
                        text='Create a password'
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
                        <Toggle setIsChecked={function (value: boolean): void {
                            throw new Error('Function not implemented.');
                        }} text='remeber me'/>


                </div>
                <Button text='Log in' size='inline' />
                <div className={styles.container}>
                    <Link href={'/register'} className={styles.link} > Dont have an account? </Link>
                    <span className={styles.link}>Sing Up For 1919</span>

                </div>

            </form>

        </div>
    )
}

export default AuthForm;