import React from 'react';
import MultiCardCarousel from '../MultiCardCarousel/MultiCardCarousel';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Artist.module.scss';

const Artist = () => {
    const artistData = [
        { image: '/images/artist1.jpg' },
        { image: '/images/artist2.jpg' },
        { image: '/images/artist3.jpg' },
        { image: '/images/artist4.jpg' },
        { image: '/images/artist5.jpg' },
        { image: '/images/artist6.jpg' },
    ];

    const renderArtistCard = (card: { image: string }, index: number) => (
        <Card
            key={index}
            images={card.image}
            imageSizeVariant={ImageSizeVariant.Rounded}
        />
    );

    return (
        <div className={styles.main}>
            <Heading title="Top Artists" />
            <MultiCardCarousel  renderCard={renderArtistCard} cards={artistData} />
        </div>
    );
};

export default Artist;
