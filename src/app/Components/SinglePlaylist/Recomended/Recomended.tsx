import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from '../../TableComponent/TableComponent';
import styles from './Recomended.module.scss';
import MultiTaskButton from '../../MultiTaskButton/MultiTaskButton';
import { SongInterface } from '@/app/interfaces/Song.interface';

type Props = {
    onclick?: () => void;
    playlistId?: string; 
    addMusic?: (musicId: string) => void;
    onPlayMusic?: (musicId: any) => void; 
    hide:boolean;
};

const Recomended = ({ onclick, playlistId, addMusic, onPlayMusic,hide}: Props) => {
    const [musics, setMusics] = useState<SongInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const accesstoken = localStorage.getItem('accesstoken'); 

            try {
                const response = await axios.get(`https://one919-backend.onrender.com/music/notInPlaylist/${playlistId}`, {
                    headers: {
                        Authorization: `Bearer ${accesstoken}`, 
                    },
                });

                setMusics(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [playlistId]); 

    const handlePlayMusic = (musicId: string) => {
        if (onPlayMusic) {
            onPlayMusic(musicId); 
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <p className={styles.text}>Recommended</p>
                <MultiTaskButton icon='/Icons/closeX.svg' onclick={onclick} />
            </div>

            <TableComponent 
                replaceButton={false}
                dataSource={musics}
                showThead={false}
                addMusic={(musicId: string) => addMusic?.(musicId)}
                onPlayMusic={handlePlayMusic} hide={hide}            />
        </div>
    );
};

export default Recomended;
