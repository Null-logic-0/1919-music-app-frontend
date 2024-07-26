import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Artist.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';

const artistData = [
    { image: '/images/artist1.jpg' },
    { image: '/images/artist2.jpg' },
    { image: '/images/artist3.jpg' },
    { image: '/images/artist4.jpg' },
    { image: '/images/artist5.jpg' },
    { image: '/images/artist6.jpg' },
    { image: '/images/artist1.jpg' },
    { image: '/images/artist2.jpg' },
    { image: '/images/artist3.jpg' },
    { image: '/images/artist4.jpg' },
    { image: '/images/artist5.jpg' },
    { image: '/images/artist6.jpg' },
];

const Artist = () => {
    const [showAll, setShowAll] = useState(false);
    const [cardsToShow, setCardsToShow] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visibleCount = 6;

            if (width > 2300) {
                visibleCount = 10;
            } else if (width >= 1500) {
                visibleCount = 6 + Math.max(0, Math.floor((width - 1900) / 100));
                visibleCount = Math.min(visibleCount, 10);
            } else if (width >= 1280) {
                visibleCount = 4;
            } else if (width >= 1075) {
                visibleCount = 3;
            } else if (width >= 1025) {
                visibleCount = 3;
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

    const trimmedData = showAll ? artistData : artistData.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Artists" />
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cards}>
                {trimmedData.map((item, id) => (
                    <Card
                        key={id}
                        images={item.image}
                        imageSizeVariant={ImageSizeVariant.Rounded}
                    />
                ))}
            </div>
        </div>
    );
};

export default Artist;
