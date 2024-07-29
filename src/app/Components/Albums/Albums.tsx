import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Albums.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';

const AlbumsData = [
    { image: '/images/album1.png' },
    { image: '/images/album2.png' },
    { image: '/images/album3.png' },
    { image: '/images/album4.png' },
    { image: '/images/album5.png' },
    { image: '/images/album1.png' },
    { image: '/images/album2.png' },
    { image: '/images/album3.png' },
    { image: '/images/album4.png' },
    { image: '/images/album5.png' },
   
];

const Albums = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = CardsHelper();

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimmedData = showAll ? AlbumsData : AlbumsData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Albums" />
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

export default Albums;
