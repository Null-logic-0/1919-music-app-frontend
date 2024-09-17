/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './TrackDisplay.module.scss';

interface TrackDisplayProps {
    currentTrack: {
        music: {
            name:string;
            authorName:string;
            url:string;
            photo:{
                url:string
            }
        };
        name: string;
        authorName: string;
        photo: {
            url: string;
        };
    };
}

const TrackDisplay = ({ currentTrack}: TrackDisplayProps) => {
    if (!currentTrack) {
        return null; 
    }

    const title = currentTrack.name || currentTrack?.music?.name;
    const authorName = currentTrack. authorName || currentTrack?.music?.authorName;
    const photoUrl = currentTrack.photo?.url || currentTrack?.music?.photo?.url;

    const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;
    const truncatedArtist =  authorName.length > 20 ? `${ authorName.slice(0, 20)}...` :  authorName;

    return (
        <div className={styles.container}>
            <img src={photoUrl} alt="Album Art" width={134} height={112} className={styles.img} />
            <div className={styles.text}>
                <span className={styles.title}>{truncatedTitle}</span>
                <span className={styles.artist}>{truncatedArtist}</span>
            </div>
        </div>
    );
};

export default TrackDisplay;
