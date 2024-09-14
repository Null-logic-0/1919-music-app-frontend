'use client'
import styles from './OneAlbum.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';
import TableComponent from '../TableComponent/TableComponent';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

const OneAlbum = () => {
    const [album, setAlbum] = useState<ArtistInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id: albumIdParam } = useParams();
    const albumId = Array.isArray(albumIdParam) ? albumIdParam[0] : albumIdParam;

    useEffect(() => {
        const fetchAlbumData = async () => {
            const token = localStorage.getItem('accesstoken');
            
            if (!token) {
                setError('Access token is missing. Please log in again.');
                setLoading(false);
                return;
            }

            if (albumId) {
                try {
                    const response = await axios.get<ArtistInterface>(
                        `https://one919-backend.onrender.com/album/${albumId}`, 
                        {                        
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    setAlbum(response.data);
                } catch (err) {
                    if (axios.isAxiosError(err) && err.response?.status === 403) {
                        setError('Access denied: You do not have permission to view this album.');
                    } else {
                        setError('Failed to fetch album data.');
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setError('Invalid album ID.');
                setLoading(false);
            }
        };

        fetchAlbumData();
    }, [albumId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!album) return <div>No album data available.</div>;

    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/topalbum' />
            <div className={styles.card}>
                <Card
                    images={album.photo}
                    name={album.title}
                    authorName={album.firstName}
                    showDetails
                    imageSizeVariant={ImageSizeVariant.Large}
                    direction='row'
                />
            </div>
            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={album.musics} />
            </div>
        </div>
    );
};

export default OneAlbum;
