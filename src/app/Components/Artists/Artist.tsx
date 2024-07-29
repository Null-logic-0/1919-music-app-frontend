import React, { useState } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Artist.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import ArtistsCardsHelper from '@/app/helpers/ArtistsCardsHelper';

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
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = ArtistsCardsHelper();

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
