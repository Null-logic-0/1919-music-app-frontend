import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Charts.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';

const ChartsData = [
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

const Charts = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = CardsHelper();

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimmedData = showAll ? ChartsData : ChartsData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Charts" link='/topcharts'/>
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cards}>
                {trimmedData.map((item, id) => (
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

export default Charts;
