'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import styles from './OneAtrist.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import TableComponent from '@/app/Components/TableComponent/TableComponent';
import Card from '../AlbumCard/Card';
import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import { ArtistInterface } from '@/app/interfaces/Artist.interface';
import { SongInterface } from '@/app/interfaces/Song.interface';
import { useParams } from 'next/navigation';
import Spinner from '../LoadingSpiner/Spiner';
import {
    currentTrackIndexState,
    musicTracksState,
    playbackStatusState,
} from '@/app/helpers/State';
import { PlaybackStatus } from '@/app/enums/player.enums';
import { useRecoilState } from 'recoil';

const OneArtist = () => {
    const [artist, setArtist] = useState<ArtistInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id: artistIdParam } = useParams();
    const artistId = Array.isArray(artistIdParam) ? artistIdParam[0] : artistIdParam;

    const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(currentTrackIndexState);
    const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
    const [playbackStatus, setPlaybackStatus] = useRecoilState(playbackStatusState);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const fetchArtistData = async () => {
            const token = localStorage.getItem('accesstoken');
            if (artistId) {
                try {
                    const response = await axios.get<ArtistInterface>(`https://one919-backend.onrender.com/author/${artistId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setArtist(response.data);
                    setMusicTracks(response.data.musics); 
                } catch (err) {
                    setError('Failed to fetch artist data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchArtistData();
    }, [artistId, setMusicTracks]);

    const handleSongClick = useCallback(
        (songId: string) => {
            const trackIndex = musicTracks.findIndex((track) => track.id === songId);
            if (trackIndex !== -1) {
                if (currentTrackIndex === trackIndex) {
                    setPlaybackStatus((prevStatus) =>
                        prevStatus === PlaybackStatus.PLAYING ? PlaybackStatus.PAUSED : PlaybackStatus.PLAYING
                    );
                } else {
                    setCurrentTrackIndex(trackIndex);
                    setPlaybackStatus(PlaybackStatus.PLAYING);
                }
            } else {
                alert(`Song with ID ${songId} not found in musicTracks`);
            }
        },
        [currentTrackIndex, musicTracks, setCurrentTrackIndex, setPlaybackStatus]
    );

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && musicTracks.length > 0 && musicTracks[currentTrackIndex]) {
            if (playbackStatus === PlaybackStatus.PLAYING) {
                audio.play();
            } else if (playbackStatus === PlaybackStatus.PAUSED) {
                audio.pause();
            }
        }
    }, [playbackStatus, currentTrackIndex, musicTracks]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && musicTracks[currentTrackIndex]) {
            const currentTrack = musicTracks[currentTrackIndex];
            audio.src = currentTrack.audioUrl || '';
            if (playbackStatus === PlaybackStatus.PLAYING) {
                audio.play();
            } else if (playbackStatus === PlaybackStatus.PAUSED) {
                audio.pause();
            }
        }
    }, [currentTrackIndex, musicTracks, playbackStatus]);

    if (loading) return <div className={styles.spinner}><Spinner /></div>;
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
                <TableComponent
                    replaceButton={false}
                    dataSource={artist.musics}
                    hide={false}
                    onPlayMusic={(song: SongInterface) => handleSongClick(song.id)}
                />
            </div>
            <audio ref={audioRef} controls hidden />
        </div>
    );
};

export default OneArtist;
