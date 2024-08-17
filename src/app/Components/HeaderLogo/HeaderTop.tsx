import styles from './HeaderTop.module.scss';
import Image from 'next/image';


const HeaderTop =()=>{
    return (
        <div className={styles.container}>
            <Image src={'/Icons/Logo.svg'} alt='logo' width={48} height={51}/>
        </div>
    )
}

export default HeaderTop;