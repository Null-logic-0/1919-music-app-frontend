import React from 'react';
import Image from 'next/image';
import styles from './TrackDisplay.module.scss';
import Link from 'next/link';
import HeartLike from '../../HeartLike/HeartLike';

interface TrackDisplayProps {
    currentTrack: {
        title: string;
        artist: string;
        albumArt: string;
    };
}

const TrackDisplay = ({ currentTrack }: TrackDisplayProps) => {
    const truncatedTitle = currentTrack.title.length > 10 ? `${currentTrack.title.slice(0, 10)}...` : currentTrack.title;
    const truncatedArtist = currentTrack.artist.length > 8 ? `${currentTrack.artist.slice(0, 8)}...` : currentTrack.artist;

    return (
        <Link href="/">
            <div className={styles.container}>
                <Image src={currentTrack.albumArt} alt="Album Art" width={134} height={112} className={styles.img} />
                <div className={styles.text}>
                    <span className={styles.title}>{truncatedTitle}</span>
                    <span className={styles.artist}>{truncatedArtist}</span>
                </div>
                <div className={styles.heartBtn}>
                    <HeartLike/>

                </div>

            </div>
        </Link>

    );
};

export default TrackDisplay;
