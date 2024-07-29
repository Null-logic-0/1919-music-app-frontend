import { ReactNode } from 'react';
import styles from './layout.module.css';

type Props ={
    children:ReactNode

}

const AuthLayout =(props:Props)=>{
    return(
        <div>
            {props.children}

        </div>
    )
}

export default AuthLayout;