'use client'
import React, { useState } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Artist.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import ArtistsCardsHelper from '@/app/helpers/ArtistsCardsHelper';

const artistData = [
    { id:1,image: '/images/artist1.jpg' },
    { id:2,image: '/images/artist2.jpg' },
    { id:3,image: '/images/artist3.jpg' },
    { id:4,image: '/images/artist4.jpg' },
    { id:5,image: '/images/artist5.jpg' },
    { id:6,image: '/images/artist6.jpg' },
    { id:7,image: '/images/artist1.jpg' },
    { id:8,image: '/images/artist2.jpg' },
    { id:9,image: '/images/artist3.jpg' },
    { id:10,image: '/images/artist4.jpg' },
    { id:11,image: '/images/artist5.jpg' },
    { id:12,image: '/images/artist6.jpg' },
];

const Artist = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = ArtistsCardsHelper();

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimmedData = showAll ? artistData : artistData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Artists" link='/topartist'/>
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cards}>
                {trimmedData.map((item) => (
                    <Card
                        key={item.id}
                        images={item.image}
                        imageSizeVariant={ImageSizeVariant.Rounded}
                        link={`/topartist/${item.id}`} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Artist;
