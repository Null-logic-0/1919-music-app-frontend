'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Artist.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import ArtistsCardsHelper from '@/app/helpers/ArtistsCardsHelper';
import { photoInterface } from '@/app/interfaces/photo.interface';

interface Artist {
    id: number;
    photo: photoInterface;
}

const Artist = () => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [artistData, setArtistData] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const cardsToShow = ArtistsCardsHelper();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const token = localStorage.getItem('accesstoken'); 

                const response = await axios.get('https://one919-backend.onrender.com/author/top', {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });

                setArtistData(response.data);
            } catch (error) {
                setError('Failed to fetch artist data');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimmedData = showAll ? artistData : artistData.slice(0, cardsToShow);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Artists" link='/topartist'/>
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cards}>
                {trimmedData.map((item) => (
                    <Card
                        key={item.id}
                        images={item.photo.url}
                        imageSizeVariant={ImageSizeVariant.Rounded}
                        link={`/topartist/${item.id}`} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Artist;
