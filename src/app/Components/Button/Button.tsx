import { ReactNode } from 'react';
import styles from './Button.module.scss';
import Image from 'next/image';


type buttonProps ={
    onclick?: ()=> void;
    text:ReactNode;
    disabled?:boolean;
    borders?: 'small'| 'medium';
    color?:'color';

}


const Button =({onclick,text,borders,disabled,color}:buttonProps)=>{
    const classNames =[styles.button];

    if (borders == 'small') classNames.push(styles.small);
    else classNames.push(styles.medium);

    if (color == 'color') classNames.push(styles.changed);

    return(
        <button onClick={onclick} className={classNames.join(' ').trim()}>
            {text}
        </button>
    )
}

export default Button;