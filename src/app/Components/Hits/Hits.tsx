'use client'
import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Hits.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';

const HitsData = [
    { id: 1, image: '/Images/hit1.png' },
    { id: 2, image: '/Images/hit2.png' },
    { id: 3, image: '/Images/hit3.png' },
    { id: 4, image: '/Images/hit4.png' },
    { id: 5, image: '/Images/hit5.png' },
    { id: 6, image: '/Images/hit1.png' },
    { id: 7, image: '/Images/hit2.png' },
    { id: 8, image: '/Images/hit3.png' },
    { id: 9, image: '/Images/hit4.png' },
    { id: 10, image: '/Images/hit5.png' },

];

const Hits = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = CardsHelper();

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimedData = showAll ? HitsData : HitsData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Hits" link='/tophits' />
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.cards}>
                    {trimedData.map((item) => (
                        <Card
                            key={item.id}
                            images={item.image}
                            imageSizeVariant={ImageSizeVariant.Medium}
                            link={`/tophits/${item.id}`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Hits;
