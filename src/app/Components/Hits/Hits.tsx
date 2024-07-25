import React from 'react';
import MultiCardCarousel from '../MultiCardCarousel/MultiCardCarousel';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Hits.module.scss';

const Hits = () => {
    const hitsData = [
        { image: '/images/hit1.png' },
        { image: '/images/hit2.png' },
        { image: '/images/hit3.png' },
        { image: '/images/hit4.png' },
        { image: '/images/hit5.png' },
        
    ];

    const renderArtistCard = (card: { image: string }, index: number) => (
        <Card
            key={index}
            images={card.image}
            imageSizeVariant={ImageSizeVariant.Medium}
        />
    );

    return (
        <div className={styles.main}>
            <Heading title="Top Hits" />
            <MultiCardCarousel  renderCard={renderArtistCard} cards={hitsData} />
        </div>
    );
};

export default Hits;
