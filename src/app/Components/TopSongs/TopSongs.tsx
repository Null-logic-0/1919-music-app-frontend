import { useState } from 'react';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../AlbumCard/Card';
import styles from './TopSongs.module.scss';
import HeartLike from '../HeartLike/HeartLike';
import Dropdown from '../dropDown/dropDown';

const options = ['Day', 'Week', 'Month']

const TopSongs = () => {
    const songs = [
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
    const songsDisplay = showAll ? songs : songs.slice(0, 4);

    const [selectedOption, setSelectedOption] = useState<string>('');

    const buttonLabel = selectedOption ? selectedOption : 'Day';

    return (
        <div className={styles.main}>
            <div className={styles.headingWrapper}>

                <div className={styles.heading}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Top 10 songs</h2>
                        <Dropdown button={<span className={styles.buttonLabel}>{buttonLabel}</span>}>
                            <div className={styles.dropDown}>
                                {
                                    options.map((option) => (
                                        <>
                                            <label key={option} className={styles.option}>
                                                <input
                                                    type='radio'
                                                    name={option}
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={(e) => setSelectedOption(e.target.value)}
                                                />
                                                {option}
                                            </label>

                                        </>

                                    ))
                                }


                            </div>
                        </Dropdown>

                    </div>

                    <button className={styles.toggleButton} onClick={toggleShowAll}>
                        {showAll ? 'show Less' : 'see all'}
                    </button>

                </div>

            </div>


            <div className={styles.container}>
                {songsDisplay.map((song, index) => (
                    <div className={styles.tableRow} key={song.id}>
                        <div className={styles.imageWrapper}>
                            <span className={styles.count}>{index + 1}</span>
                            <Card
                                images={song.image}
                                direction='row'
                                imageSizeVariant={ImageSizeVariant.Small}
                                showDetails
                                title={song.title}
                                subtitle={song.artist}
                            />
                        </div>
                        <div className={styles.action}>
                            <span className={styles.duration}>{song.duration}</span>
                            <span className={styles.plays}>{song.plays} Plays</span>
                            <HeartLike />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default TopSongs;
