'use client'
import React, { useState, useEffect } from 'react';
import Card from '../AlbumCard/Card';
import Heading from '../Heading/Heading';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './Hits.module.scss';
import SeeAllButton from '../SeeAllButton/SeeAllButton';
import CardsHelper from '@/app/helpers/CardsHelper';
import { photoInterface } from '@/app/interfaces/photo.interface';
import axios from 'axios';

interface Hits {
    id:number;
    photo:photoInterface;
}

const Hits = () => {
    const [hits,setHits]=useState<Hits[]>([]);
    const [showAll, setShowAll] = useState<boolean>(false);
    const cardsToShow = CardsHelper();
    

    useEffect(() => {
        const fetchHits = async () => {
          try {
            const accessToken = localStorage.getItem('accesstoken');;
            const response = await axios.get(
              "https://one919-backend.onrender.com/music/hits",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            setHits(response.data);
          } catch (error) {
            console.error("Error fetching albums:", error);
          }
        };
    
        fetchHits();
      }, []);

    const toggleShowAll = () => setShowAll(prevShowAll => !prevShowAll);

    const trimedData = showAll ? hits : hits.slice(0, cardsToShow);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Heading title="Top Hits" link='/tophits' />
                <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.cards}>
                    {trimedData.map((item) => (
                        <Card
                            key={item.id}
                            images={item.photo.url}
                            imageSizeVariant={ImageSizeVariant.Medium}
                            link={`/tophits/${item.id}`}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Hits;
