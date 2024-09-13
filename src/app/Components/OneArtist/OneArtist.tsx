'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './OneAtrist.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import TableComponent from '@/app/Components/TableComponent/TableComponent';
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';
import { useParams } from 'next/navigation';

const OneArtist = () => {
    const [artist, setArtist] = useState<ArtistInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id: artistIdParam } = useParams();
    const artistId = Array.isArray(artistIdParam)
    ? artistIdParam[0]
    : artistIdParam;


    useEffect(() => {
        const fetchArtistData = async () => {
            const token = localStorage.getItem('accesstoken')
            if (artistId) {
                try {
                    const response = await axios.get<ArtistInterface>(`https://one919-backend.onrender.com/author/${artistId}`, {                        
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                        
                    });
                    console.log(response,'zd');

                    setArtist(response.data);
                } catch (err) {
                    setError('Failed to fetch artist data');
                } finally {
                    setLoading(false);
                }
            }
            
            
        };

        fetchArtistData();
    }, [artistId]);

    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!artist) return <div>No artist data available</div>;

    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/topartist' />
            <div className={styles.card}>
                <Card
                    images={artist.photo.url} 
                    name={artist.firstName}
                    authorName={artist.lastName}
                    biography={artist.biography}
                    showDetails
                    imageSizeVariant={ImageSizeVariant.RoundedXL}
                    direction='row'
                />
            </div>
            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={artist.musics} />
            </div>
        </div>
    );
}

export default OneArtist;
