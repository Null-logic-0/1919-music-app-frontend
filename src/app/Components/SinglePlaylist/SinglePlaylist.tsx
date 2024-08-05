'use client'
import PagesHeaderTop from '../PagesHeaderTop/PagesHeaderTop';
import styles from './SinglePlaylist.module.scss';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';
import { useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import Recomended from './Recomended/Recomended';
import PlaylistHeader from './PlaylistHeader/PlaylistHeader';

const data: ArtistInterface[] = [
    {
        title: 'coldplay',
        image: '/Images/album5.png',
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

const SinglePlaylist = () => {
    const playlist = data[0];
    const [searchTerm, setSearchTerm] = useState(' ');
    const [showRecommended, setShowRecommended] = useState(false);

    const handleAddMusic = () => {
        setShowRecommended(true);
    };

    const handleClose =()=>{
        setShowRecommended(false)
    }

    const isTableEmpty = playlist.musics.length === 0;


    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/playlist' />
            <div className={styles.container}>
                <div className={styles.playlistHeader}>
                    <PlaylistHeader
                        playlist={playlist}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        addMusics={handleAddMusic}
                        isTablefull={isTableEmpty} />

                </div>

                {
                    !isTableEmpty
                        ? (<TableComponent replaceButton={true} dataSource={playlist.musics} edit add={handleAddMusic} />)
                        : (<Recomended />)
                }


            </div>

            {showRecommended && <Recomended onclick={handleClose}/>}

        </div>
    )
}

export default SinglePlaylist;