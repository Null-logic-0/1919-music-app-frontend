'use client';
import React, { useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
    playbackStatusState,
    volumeState,
    loopStatusState,
    shuffleStatusState,
    currentTimeState,
    durationState,
    currentTrackIndexState,
    musicTracksState,
} from '../../helpers/State';
import { PlaybackStatus, LoopStatus, ShuffleStatus } from '../../enums/player.enums';
import Controls from '../../Components/PlayerControler/Controls/Controls';
import TrackDisplay from '../../Components/PlayerControler/TrackDisplay/TrackDisplay';
import styles from './PlayerControler.module.scss';
import VolumeControl from '../../Components/PlayerControler/VolumeControl/VolumeControl';
import { Track } from '@/app/interfaces/Track.interface';

const PlayerController = ({ isAlbumMode, albumId }: { isAlbumMode: boolean, albumId?: string }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(currentTrackIndexState);
    const [playbackStatus, setPlaybackStatus] = useRecoilState(playbackStatusState);
    const [volume, setVolume] = useRecoilState(volumeState);
    const [loopStatus, setLoopStatus] = useRecoilState(loopStatusState);
    const [shuffleStatus, setShuffleStatus] = useRecoilState(shuffleStatusState);
    const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
    const [duration, setDuration] = useRecoilState(durationState);
    const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const fetchTracks = async () => {
            const accessToken = localStorage.getItem('accesstoken');
            try {
                const endpoint = isAlbumMode
                    ? `https://one919-backend.onrender.com/music/inAlbum?albumId=${albumId}`
                    : 'https://one919-backend.onrender.com/music';
                
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setMusicTracks(response.data);
            } catch (error) {
                console.error(`API Error: ${error}`);
            }
        };

        if (musicTracks.length === 0 || isAlbumMode) {
            fetchTracks();
        }
    }, [isAlbumMode, albumId, musicTracks, setMusicTracks]);

    const currentTrack = musicTracks[currentTrackIndex];

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume / 100;
            audio.loop = loopStatus === LoopStatus.ENABLED;
        }
    }, [volume, loopStatus]);

    const playNextTrack = useCallback(() => {
        const newIndex = shuffleStatus === ShuffleStatus.ENABLED
            ? Math.floor(Math.random() * musicTracks.length)
            : (currentTrackIndex + 1) % musicTracks.length;
        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);
        setPlaybackStatus(PlaybackStatus.PLAYING);
    }, [shuffleStatus, currentTrackIndex, musicTracks.length, setCurrentTrackIndex, setCurrentTime, setPlaybackStatus]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleTrackEnded = () => {
            playNextTrack();
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleTrackEnded);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleTrackEnded);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [playNextTrack, setCurrentTime, setDuration]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            if (playbackStatus === PlaybackStatus.PLAYING) {
                audio.play().catch(error => console.error("Playback failed:", error));
            } else {
                audio.pause();
            }
        }
    }, [playbackStatus, currentTrackIndex]);

    const playPause = useCallback(() => {
        setPlaybackStatus(prevStatus =>
            prevStatus === PlaybackStatus.PLAYING ? PlaybackStatus.PAUSED : PlaybackStatus.PLAYING
        );
    }, [setPlaybackStatus]);

    const playPrevious = useCallback(() => {
        const newIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
        setCurrentTrackIndex(newIndex);
        setCurrentTime(0);
        setPlaybackStatus(PlaybackStatus.PLAYING);
    }, [currentTrackIndex, setCurrentTrackIndex, setCurrentTime, setPlaybackStatus, musicTracks.length]);

    const handleVolumeChange = useCallback((newVolume: number) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    }, [setVolume]);

    const toggleLoop = useCallback(() => {
        setLoopStatus(prevStatus =>
            prevStatus === LoopStatus.ENABLED ? LoopStatus.DISABLED : LoopStatus.ENABLED
        );
    }, [setLoopStatus]);

    const toggleShuffle = useCallback(() => {
        setShuffleStatus(prevStatus =>
            prevStatus === ShuffleStatus.ENABLED ? ShuffleStatus.DISABLED : ShuffleStatus.ENABLED
        );
    }, [setShuffleStatus]);

    const handleTimeChange = useCallback((newTime: number) => {
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    }, [setCurrentTime]);

    const handleDoubleClick = useCallback(() => {
        const newTime = Math.min(currentTime + 10, duration);
        handleTimeChange(newTime);
    }, [currentTime, duration, handleTimeChange]);

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                {currentTrack && <TrackDisplay currentTrack={currentTrack}  />}
                <Controls
                    playbackStatus={playbackStatus}
                    loopStatus={loopStatus}
                    shuffleStatus={shuffleStatus}
                    onPlayPause={playPause}
                    onNext={playNextTrack}
                    onPrevious={playPrevious}
                    onToggleLoop={toggleLoop}
                    onToggleShuffle={toggleShuffle}
                    currentTime={currentTime}
                    duration={duration}
                    onTimeChange={handleTimeChange}
                    onDoubleClick={handleDoubleClick}
                />
                <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
                {currentTrack && (
                    <audio
                        ref={audioRef}
                        src={currentTrack.audio.url}
                    />
                )}
            </div>
        </div>
    );
};

export default PlayerController;
