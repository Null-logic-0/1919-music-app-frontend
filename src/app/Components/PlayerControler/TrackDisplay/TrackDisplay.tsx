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
    const truncatedTitle = currentTrack.title.length > 20 ? `${currentTrack.title.slice(0, 20)}...` : currentTrack.title;
    const truncatedArtist = currentTrack.artist.length > 20 ? `${currentTrack.artist.slice(0, 20)}...` : currentTrack.artist;

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
