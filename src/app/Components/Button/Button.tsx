import styles from './Button.module.scss';
import Image from 'next/image';


type buttonProps ={
    onclick?: ()=> void;
    text:string;
    size?: 'inline' | 'large';
    borders?: 'small'| 'medium';
    color?:'changed';

}


const Button =({onclick,text,size,borders,color}:buttonProps)=>{
    const classNames =[styles.button];

    if (size == 'inline') classNames.push(styles.inline);
    else classNames.push(styles.large);

    if (borders == 'small') classNames.push(styles.small);
    else classNames.push(styles.medium);

    if (color == 'changed') classNames.push(styles.changed);




    return(
        <button onClick={onclick} className={classNames.join(' ').trim()}>
            {text}
        </button>
    )
}

export default Button;