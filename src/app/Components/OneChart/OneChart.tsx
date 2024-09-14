'use client'
import styles from './OneChart.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import TableComponent from '@/app/Components/TableComponent/TableComponent';
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';




const OneChart = () => {
    const [charts, setcharts] = useState<ArtistInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id: chartsIdParam } = useParams();
    const chartsId = Array.isArray(chartsIdParam)
    ? chartsIdParam[0]
    : chartsIdParam;


    useEffect(() => {
        const fetchChartsData = async () => {
            const token = localStorage.getItem('accesstoken')
            if (chartsId) {
                try {
                    const response = await axios.get<ArtistInterface>(`https://one919-backend.onrender.com/music/${chartsId}`, {                        
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                        
                    });
                    console.log(response,'zd');

                    setcharts(response.data);
                } catch (err) {
                    setError('Failed to fetch charts data');
                } finally {
                    setLoading(false);
                }
            }
            
            
        };

        fetchChartsData();
    }, [chartsId]);

    

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!charts) return <div>No artist data available</div>;


    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/topcharts' />
            <div className={styles.card}>

                <Card
                    images={charts.photo.url}
                    name={charts.name}
                    authorName={charts.authorName}
                    showDetails
                    imageSizeVariant={ImageSizeVariant.Large}
                    direction='row'
                />

            </div>

            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={charts.musics} />
            </div>
        </div>
    );
}

export default OneChart;
