'use client'
import { useState } from 'react';
import styles from './TopSongs.module.scss';
import Dropdown from '../dropDown/dropDown';
import DayWeekDRP from '../dropDown/DayWeekDropContent/DayWeek';
import SongItem from './SongItem/SongsItem';



const TopSongs = () => {
    const songsData = [
        { id: 1, image: '/images/albumCard.png', title: 'Song Name 1', artist: 'Artist Name 1', duration: '4.32', plays: '523M' },
        { id: 2, image: '/images/albumCard.png', title: 'Song Name 2', artist: 'Artist Name 2', duration: '3.45', plays: '420M' },
        { id: 3, image: '/images/albumCard.png', title: 'Song Name 3', artist: 'Artist Name 3', duration: '5.12', plays: '610M' },
        { id: 4, image: '/images/albumCard.png', title: 'Song Name 4', artist: 'Artist Name 4', duration: '3.58', plays: '200M' },
        { id: 5, image: '/images/albumCard.png', title: 'Song Name 5', artist: 'Artist Name 5', duration: '4.22', plays: '320M' },
        { id: 6, image: '/images/albumCard.png', title: 'Song Name 6', artist: 'Artist Name 6', duration: '4.01', plays: '480M' },
        { id: 7, image: '/images/albumCard.png', title: 'Song Name 7', artist: 'Artist Name 7', duration: '3.49', plays: '275M' },
        { id: 8, image: '/images/albumCard.png', title: 'Song Name 8', artist: 'Artist Name 8', duration: '4.36', plays: '510M' },
        { id: 9, image: '/images/albumCard.png', title: 'Song Name 9', artist: 'Artist Name 9', duration: '4.28', plays: '300M' },
        { id: 10, image: '/images/albumCard.png', title: 'Song Name 10', artist: 'Artist Name 10', duration: '4.40', plays: '650M' }
    ];



    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);
    const songsDisplay = showAll ? songsData : songsData.slice(0, 4);

    const [selectedOption, setSelectedOption] = useState('Day')

    const onOptionSelected = (option: string) => {
        setSelectedOption(option)
    }

    return (
        <div className={styles.main}>
            <div className={styles.headingWrapper}>

                <div className={styles.heading}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Top 10 songs</h2>
                        <Dropdown button={selectedOption}><DayWeekDRP onOptionSelected={onOptionSelected} /></Dropdown>

                    </div>

                    <button className={styles.toggleButton} onClick={toggleShowAll}>
                        {showAll ? 'show Less' : 'see all'}
                    </button>

                </div>

            </div>


            <div className={styles.container}>
                {songsDisplay.map((song, index) => (
                    <SongItem key={song.id} song={song} index={index} />
                ))}
            </div>

        </div>
    );
}

export default TopSongs;
