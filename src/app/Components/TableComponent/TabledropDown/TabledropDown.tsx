import styles from "./TabledropDown.module.scss";
import Image from 'next/image';


interface TabledropDownProps {
    onEdit?: () => void;
    onAdd?: () => void;
}

const TabledropDown = ({ onEdit, onAdd }: TabledropDownProps) => {

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onAdd}>
                <Image src={'/Icons/plus.png'} alt='icon' width={24} height={24} />
                Add New Music

            </button>
            <button className={styles.button} onClick={onEdit}>
                <Image src={'/Icons/editWhite.svg'} alt='icon' width={24} height={24} />
                Edit Details

            </button>
        </div>
    )
}

export default TabledropDown;