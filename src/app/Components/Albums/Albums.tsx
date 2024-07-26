import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Albums.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';

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

const Charts = () => {
    const [showAll, setShowAll] = useState(false);
    const [cardsToShow, setCardsToShow] = useState(4); 
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visibleCount = 4;

            if (width > 2300) {
                visibleCount = 6;
            } else if (width >= 1500) {
                visibleCount = 3 + Math.max(0, Math.floor((width - 1900) / 100));
                visibleCount = Math.min(visibleCount, 6);
            } else if (width >= 1280) {
                visibleCount = 3;
            } else if (width >= 1075) {
                visibleCount = 2;
            } else if (width >= 1025) {
                visibleCount = 2;
            }else {
                visibleCount = 6; 
            }

            setCardsToShow(visibleCount);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimedData = showAll ? AlbumsData : AlbumsData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Albums" />
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

export default Charts;
