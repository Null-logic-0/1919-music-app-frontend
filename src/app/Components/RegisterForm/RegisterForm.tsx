'use client'
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './RegisterFrom.module.scss';
import { RegisterFormInterface } from '@/app/interfaces/Register.interface';
import classNames from 'classnames';
import Image
 from 'next/image';
const RegisterFrom = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInterface>();

  const submitRegister = (values: RegisterFormInterface) => {
    console.log('values', values);
  }

  return (
    <div className={styles.main}>
      <Image src={'/Icons/Logo.svg'} alt='logo' width={100} height={105}/>
      <div className={styles.text}>
        <p className={styles.title}>Sign up for free to start listening the music</p>
        <p className={styles.subtitle}>Sign up with your email address</p>
      </div>
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

          <Input
            type='password'
            showHideButton
            text='Repeat password'
            className={classNames({ [styles.inputError]: errors.passwordRepeat })}
            {...register('passwordRepeat', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match'
            })}
          />
          {errors.passwordRepeat && <span className={styles.error}>{errors.passwordRepeat.message}</span>}
        </div>
        <Button text='Sign in' size='inline' />
      </form>
    </div>
  )
}

export default RegisterFrom;
