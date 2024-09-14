'use client'
import styles from './HomePageTop.module.scss';
import Logout from '../LogOut/LogOut';

const HomePageTop = () => {
    return (
        <div className={styles.container}>
            <Logout/>
        </div>

    )
}

export default HomePageTop;