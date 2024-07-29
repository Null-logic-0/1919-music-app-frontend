import { useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import styles from './LogOut.module.scss';
import Image from 'next/image';
import Dropdown from '../dropDown/dropDown';
import Button from '../Button/Button';

const Logout = () => {

    const [showDetails, setShowDetails] = useState(false);

    const handleOpen = () => {
        setShowDetails(!showDetails)
    }

    return (
        <div className={styles.main}>
            <div className={styles.fixed}>
                <MultiTaskButton icon={'/icons/Logout.svg'} onclick={handleOpen} />

            </div>

            {
                showDetails &&
                <div className={styles.container}>
                    <p className={styles.text}>Do you want to Log-Out?</p>
                    <div className={styles.button}>

                        <Button text='Yes' size='inline' borders='small' />
                        <Button text='NO' size='inline' borders='small' color='changed' onclick={handleOpen}/>

                    </div>

                </div>

            }

        </div>



    )
}

export default Logout;