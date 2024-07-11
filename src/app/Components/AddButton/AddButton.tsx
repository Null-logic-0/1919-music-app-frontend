import Image from 'next/image';
import styles from './AddButton.module.scss';

interface addButtonProps {
    onClick?: ()=>void;
}


const AddButton = ({onClick}:addButtonProps) =>{
    return(
        <div className={styles.container}>
            <button onClick={onClick} className={styles.button}>
                <Image src={'/icons/plus.png'} alt='icon' width={32} height={32}/>
            </button>
            <span className={styles.title}>New playlist</span>
        </div>
    )
}

export default AddButton;