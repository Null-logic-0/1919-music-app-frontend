import styles from './MultiTaskButton.module.scss';
import Image from 'next/image';

type buttonProps ={
    icon:string;
    onclick?:(musicId:any)=>void;

}

const MultiTaskButton =({icon,onclick}:buttonProps)=>{
    return (
        <button onClick={onclick} className={styles.button}>
            <Image src={icon} alt='icon' width={36} height={36} className={styles.icon}/>
        </button>
    )
}

export default MultiTaskButton;