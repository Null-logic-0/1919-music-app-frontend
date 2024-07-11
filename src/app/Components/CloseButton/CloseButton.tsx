import Image from 'next/image';
import styles from './CloseButton.module.scss';

type CloseButtonProps = {
    onclick?: ()=>void;
    className?:string;
}

const CloseButton =({onclick,className}:CloseButtonProps)=>{
    return(
        <button onClick={onclick} className={`${styles.button} ${className}`}>
            <Image src={'/icons/closeX.svg'} alt='icon' width={28} height={28} className={styles.icon}/>

        </button>
    )
}

export default CloseButton;