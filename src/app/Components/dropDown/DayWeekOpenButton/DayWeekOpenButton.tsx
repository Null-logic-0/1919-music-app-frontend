import { useState } from 'react';
import Image from 'next/image';
import styles from './DayWeekOpenButton.module.scss';


const DayweekOpnBtn = () => {
   
    return (
        <>
            <div>
               
                <Image
                    src={'/Icons/asdasdas.svg'}
                    alt="icon"
                    width={32}
                    height={32}
                    className={styles.icon}
                />
            </div>
        </>
    );
}

export default DayweekOpnBtn;
