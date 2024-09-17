"use client";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { authState } from "@/app/helpers/authState";
import { ReactNode, useEffect, useState } from "react";
import Spinner from "../LoadingSpiner/Spiner";
import styles from './AuthGuard.module.scss';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (isAuthenticated === undefined) {
      return; 
    }

    if (isAuthenticated) {
      setIsLoading(false); 
    } else {
      router.push("/auth"); 
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div className={styles.spinner}><Spinner/></div>; 
  }

  return <>{children}</>;
};

export default AuthGuard;
