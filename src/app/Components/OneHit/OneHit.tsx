'use client'
import styles from './OneHit.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';
import TableComponent from '../TableComponent/TableComponent';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';



const OneHit = () => {
    const [hits, setHits] = useState<ArtistInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id: hitsIdParam } = useParams();
    const hitsId = Array.isArray(hitsIdParam)
    ? hitsIdParam[0]
    : hitsIdParam;


    useEffect(() => {
        const fetchHitsData = async () => {
            const token = localStorage.getItem('accesstoken')
            if (hitsId) {
                try {
                    const response = await axios.get<ArtistInterface>(`https://one919-backend.onrender.com/music/${hitsId}`, {                        
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                        
                    });
                    console.log(response,'zd');

                    setHits(response.data);
                } catch (err) {
                    setError('Failed to fetch artist data');
                } finally {
                    setLoading(false);
                }
            }
            
            
        };

        fetchHitsData();
    }, [hitsId]);

    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!hits) return <div>No artist data available</div>;

    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/tophits' />
            <div className={styles.card}>

                <Card
                    images={hits.photo.url}
                    name={hits.name}
                    authorName={hits.authorName}
                    showDetails
                    imageSizeVariant={ImageSizeVariant.Large}
                    direction='row'
                />

            </div>

            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={hits.musics} />
            </div>
        </div>
    );
}

export default OneHit;
