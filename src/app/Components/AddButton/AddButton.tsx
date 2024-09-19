import Image from 'next/image';
import styles from './AddButton.module.scss';

interface addButtonProps {
    onClick?: ()=>void;
    text?:string;
}


const AddButton = ({onClick,text}:addButtonProps) =>{
    return(
        <>
            <button onClick={onClick} className={styles.button}>
                <Image src={'/Icons/plus.png'} alt='icon' width={32} height={32}/>
                <span className={styles.title}>{text}</span>
            </button>
        </>
    )
}

export default AddButton;