import React from 'react';
import styles from './SongItme.module.scss';
import { SongInterface } from '@/app/interfaces/Song.interface';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../../AlbumCard/Card';
import HeartLike from '../../HeartLike/HeartLike';
import MultiTaskButton from '../../MultiTaskButton/MultiTaskButton';

interface SongItemProps {
    song: SongInterface;
    index: number;
    toPlay?: boolean;
    togglePlay?: () => void;
}

const SongItem = ({ song, index, toPlay, togglePlay }: SongItemProps) => {


    return (
        <div className={styles.tableRow}>
            <div className={styles.imageWrapper}>
                <span className={styles.count}>{index + 1}</span>
                <Card
                    images={song.image}
                    direction="row"
                    imageSizeVariant={ImageSizeVariant.Small}
                    showDetails
                    title={song.title}
                    subtitle={song.artist}
                />
            </div>
            <div className={styles.action}>
                <span className={styles.duration}>{song.duration}</span>
                <span className={styles.plays}>{song.plays} Plays</span>


                <MultiTaskButton icon={toPlay ? '/icons/toPause.svg' : '/icons/toPlay.svg'} onclick={togglePlay} />


                <HeartLike />


            </div>
        </div>
    );
};

export default SongItem;
