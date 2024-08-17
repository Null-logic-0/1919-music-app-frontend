'use client'
import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Albums.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';

const AlbumsData = [
    { id: 1, image: '/Images/album1.png' },
    { id: 2, image: '/Images/album2.png' },
    { id: 3, image: '/Images/album3.png' },
    { id: 4, image: '/Images/album4.png' },
    { id: 5, image: '/Images/album5.png' },
    { id: 6, image: '/Images/album1.png' },
    { id: 7, image: '/Images/album2.png' },
    { id: 8, image: '/Images/album3.png' },
    { id: 9, image: '/Images/album4.png' },
    { id: 10, image: '/Images/album5.png' },

];

const Albums = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = CardsHelper();

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimmedData = showAll ? AlbumsData : AlbumsData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Albums" link='/topalbum' />
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.cards}>
                    {trimmedData.map((item) => (
                        <Card
                            key={item.id}
                            images={item.image}
                            imageSizeVariant={ImageSizeVariant.Medium}
                            link={`/topalbum/${item.id}`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Albums;
