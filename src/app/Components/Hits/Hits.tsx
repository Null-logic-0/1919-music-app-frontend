import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Hits.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';

const HitsData = [
    { image: '/images/hit1.png' },
    { image: '/images/hit2.png' },
    { image: '/images/hit3.png' },
    { image: '/images/hit4.png' },
    { image: '/images/hit5.png' },
    { image: '/images/hit1.png' },
    { image: '/images/hit2.png' },
    { image: '/images/hit3.png' },
    { image: '/images/hit4.png' },
    { image: '/images/hit5.png' },
   
];

const Hits = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = CardsHelper();

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimedData = showAll ? HitsData : HitsData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Hits" />
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cards}>
                {trimedData.map((item, id) => (
                    <Card
                        key={id}
                        images={item.image}
                        imageSizeVariant={ImageSizeVariant.Medium}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hits;
