import Image from 'next/image';
import styles from './AddButton.module.scss';

interface addButtonProps {
    onClick?: ()=>void;
    text?:string;
}


const AddButton = ({onClick,text}:addButtonProps) =>{
    return(
        <div className={styles.container}>
            <button onClick={onClick} className={styles.button}>
                <Image src={'/icons/plus.png'} alt='icon' width={32} height={32}/>
            </button>
            <span className={styles.title}>{text}</span>
        </div>
    )
}

export default AddButton;