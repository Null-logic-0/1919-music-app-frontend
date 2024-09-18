"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./RegisterFrom.module.scss";
import { RegisterFormInterface } from "@/app/interfaces/Register.interface";
import classNames from "classnames";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { authState } from "@/app/helpers/authState";
import Spinner from "../LoadingSpiner/Spiner";

const RegisterFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInterface>();
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleRegistrationSuccess = (user: any, token: string) => {
    setAuth({
      isAuthenticated: true,
      user: user,
    });

    localStorage.setItem(
      "auth",
      JSON.stringify({
        isAuthenticated: true,
        user: user,
        token: token,
      })
    );

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    router.push("/auth");
  };

  const submitRegister = async (values: RegisterFormInterface) => {
    setLoading(true);
    setErrorMessage(null); 

    try {
      const response = await axios.post(
        "https://one919-backend.onrender.com/user/signup",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const { user, token } = response.data;
        handleRegistrationSuccess(user, token);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMessage("The email is already in use. Please use a different email.");
        } else {
          setErrorMessage("The email is already in use. Please use a different email.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <Image src="/Icons/Logo.svg" alt="logo" width={100} height={105} />
      <div className={styles.text}>
        <p className={styles.title}>
          Sign up for free to start listening to music
        </p>
        <p className={styles.subtitle}>Sign up with your email address</p>
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>} 

      <form className={styles.form} onSubmit={handleSubmit(submitRegister)}>
        <div className={styles.inputs}>
          <Input
            type="email"
            text="Enter your E-mail"
            className={classNames({ [styles.inputError]: errors.email })}
            {...register("email", {
              required: "E-mail is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match E-mail format",
              },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}

          <Input
            type="password"
            showHideButton
            text="Create a password"
            className={classNames({ [styles.inputError]: errors.password })}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}

          <Input
            type="password"
            showHideButton
            text="Repeat password"
            className={classNames({
              [styles.inputError]: errors.passwordRepeat,
            })}
            {...register("passwordRepeat", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.passwordRepeat && (
            <span className={styles.error}>
              {errors.passwordRepeat.message}
            </span>
          )}
        </div>

        <div className={styles.button}>
          <Button
            text={loading ? "Registration..." : "Sign up"}
            disabled={loading}
          />
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

export default RegisterFrom;
