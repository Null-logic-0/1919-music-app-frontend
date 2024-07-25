import React from 'react';
import MultiCardCarousel from '../MultiCardCarousel/MultiCardCarousel';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Albums.module.scss';

const Albums = () => {
    const albumsData = [
        { image: '/images/album1.png' },
        { image: '/images/album2.png' },
        { image: '/images/album4.png' },
        { image: '/images/album3.png' },
        { image: '/images/album5.png' },
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
            <Heading title="Top Albums" />
            <MultiCardCarousel cards={albumsData} renderCard={renderArtistCard}  />
        </div>
    );
};

export default Albums;
