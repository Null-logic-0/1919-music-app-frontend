import { useState } from 'react';
import Search from '../Search/Search';
import styles from './HomePageTop.module.scss';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';

const HomePageTop = () => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className={styles.container}>
            <Search placeHolder="Search for music" searchTerm={searchTerm} setSearchTerm={setSearchTerm} icon />
            <Logout/>
        </div>

    )
}

export default HomePageTop;