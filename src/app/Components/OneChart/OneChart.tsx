'use client'
import styles from './OneChart.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import TableComponent from '@/app/Components/TableComponent/TableComponent';
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';

const data: ArtistInterface[] = [
    {
        title: 'coldplay',
        image: '/Images/albumpage.png',
        subtitle: '100 song',
        musics: [
            {
                id: 1,
                image: '/Images/DesirelessCover.jpg',
                title: 'title',
                artist: 'Name',
                duration: '4,50',
                plays: '30000',
                album: 'Songs 20',
                key: '1'
            },
            {
                id: 2,
                image: '/Images/D.jpg',
                title: 'title',
                artist: 'Name',
                duration: '4,50',
                plays: '30000',
                album: 'Songs 20',
                key: '2'
            },
            {
                id: 3,
                image: '/Images/indila.jpg',
                title: 'title',
                artist: 'Name',
                duration: '4,50',
                plays: '30000',
                album: 'Songs 20',
                key: '3'
            }
        ]
    }
];

const OneChart = () => {
    const artist = data[0]; 

    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/topcharts' />
            <div className={styles.card}>

                <Card
                    images={artist.image}
                    title={artist.title}
                    subtitle={artist.subtitle}
                    showDetails
                    imageSizeVariant={ImageSizeVariant.Large}
                    direction='row'
                />

            </div>

            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={artist.musics} />
            </div>
        </div>
    );
}

export default OneChart;
