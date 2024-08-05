import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Charts.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';

const ChartsData = [
    { id:1,image: '/images/hit1.png' },
    { id:2,image: '/images/hit2.png' },
    { id:3,image: '/images/hit3.png' },
    { id:4,image: '/images/hit4.png' },
    { id:5,image: '/images/hit5.png' },
    { id:6,image: '/images/hit1.png' },
    { id:7,image: '/images/hit2.png' },
    { id:8,image: '/images/hit3.png' },
    { id:9,image: '/images/hit4.png' },
    { id:10,image: '/images/hit5.png' },
   
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
                {trimmedData.map((item) => (
                    <Card
                        key={item.id}
                        images={item.image}
                        imageSizeVariant={ImageSizeVariant.Medium}
                        link={`/topcharts/${item.id}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Charts;
