'use client'
import { useState } from 'react';
import Search from '../Search/Search';
import styles from './HomePageTop.module.scss';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Logout from '../LogOut/LogOut';

const HomePageTop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className={styles.container}>
            <Logout/>
        </div>

    )
}

export default HomePageTop;