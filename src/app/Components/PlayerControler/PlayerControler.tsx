"use client";
import React, { useRef, useEffect, useCallback } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  playbackStatusState,
  volumeState,
  loopStatusState,
  shuffleStatusState,
  currentTimeState,
  durationState,
  currentTrackIndexState,
  musicTracksState,
} from "../../helpers/State";
import {
  PlaybackStatus,
  LoopStatus,
  ShuffleStatus,
} from "../../enums/player.enums";
import Controls from "../../Components/PlayerControler/Controls/Controls";
import TrackDisplay from "../../Components/PlayerControler/TrackDisplay/TrackDisplay";
import styles from "./PlayerControler.module.scss";
import VolumeControl from "../../Components/PlayerControler/VolumeControl/VolumeControl";

const PlayerController = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);
  const [volume, setVolume] = useRecoilState(volumeState);
  const [loopStatus, setLoopStatus] = useRecoilState(loopStatusState);
  const [shuffleStatus, setShuffleStatus] = useRecoilState(shuffleStatusState);
  const [currentTime, setCurrentTime] = useRecoilState(currentTimeState);
  const [duration, setDuration] = useRecoilState(durationState);
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      const accessToken = localStorage.getItem("accesstoken");
      try {
        const response = await axios.get(
          "https://one919-backend-1.onrender.com/music",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMusicTracks(response.data);
      } catch (error) {
        console.error(`API Error: ${error}`);
      }
    };

    if (musicTracks.length === 0) {
      fetchTracks();
    }
  }, [musicTracks, setMusicTracks, currentTrackIndex]);

  const currentTrack = musicTracks[currentTrackIndex] || null;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.loop = loopStatus === LoopStatus.ENABLED;
    }
  }, [volume, loopStatus]);

  const playNextTrack = useCallback(() => {
    let nextIndex;
    if (shuffleStatus === ShuffleStatus.ENABLED) {
      nextIndex = Math.floor(Math.random() * musicTracks.length);
    } else {
      nextIndex = (currentTrackIndex + 1) % musicTracks.length;
    }

    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    setPlaybackStatus(PlaybackStatus.PLAYING);
  }, [
    shuffleStatus,
    currentTrackIndex,
    musicTracks,
    setCurrentTrackIndex,
    setCurrentTime,
    setPlaybackStatus,
  ]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleTrackEnd = () => playNextTrack();
    const handleMetadataLoaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleTrackEnd);
    audio.addEventListener("loadedmetadata", handleMetadataLoaded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleTrackEnd);
      audio.removeEventListener("loadedmetadata", handleMetadataLoaded);
    };
  }, [playNextTrack, setCurrentTime, setDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentTrack) {
      playbackStatus === PlaybackStatus.PLAYING
        ? audio.play().catch(console.error)
        : audio.pause();
    }
  }, [playbackStatus, currentTrackIndex, currentTrack]);

  const togglePlayPause = useCallback(() => {
    setPlaybackStatus((status) =>
      status === PlaybackStatus.PLAYING
        ? PlaybackStatus.PAUSED
        : PlaybackStatus.PLAYING
    );
  }, [setPlaybackStatus]);

  const playPreviousTrack = useCallback(() => {
    const prevIndex =
      (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;

    setCurrentTrackIndex(prevIndex);
    setCurrentTime(0);
    setPlaybackStatus(PlaybackStatus.PLAYING);
  }, [
    currentTrackIndex,
    musicTracks,
    setCurrentTrackIndex,
    setCurrentTime,
    setPlaybackStatus,
  ]);

  const changeVolume = useCallback(
    (newVolume: number) => {
      setVolume(newVolume);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
      }
    },
    [setVolume]
  );

  const toggleLoop = useCallback(() => {
    setLoopStatus((status) =>
      status === LoopStatus.ENABLED ? LoopStatus.DISABLED : LoopStatus.ENABLED
    );
  }, [setLoopStatus]);

  const toggleShuffle = useCallback(() => {
    setShuffleStatus((status) =>
      status === ShuffleStatus.ENABLED
        ? ShuffleStatus.DISABLED
        : ShuffleStatus.ENABLED
    );
  }, [setShuffleStatus]);

  const changeTime = useCallback(
    (newTime: number) => {
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    },
    [setCurrentTime]
  );

  const fastForward = useCallback(() => {
    const newTime = Math.min(currentTime + 10, duration);
    changeTime(newTime);
  }, [currentTime, duration, changeTime]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {currentTrack && <TrackDisplay currentTrack={currentTrack} />}
        <Controls
          playbackStatus={playbackStatus}
          loopStatus={loopStatus}
          shuffleStatus={shuffleStatus}
          onPlayPause={togglePlayPause}
          onNext={playNextTrack}
          onPrevious={playPreviousTrack}
          onToggleLoop={toggleLoop}
          onToggleShuffle={toggleShuffle}
          currentTime={currentTime}
          duration={duration}
          onTimeChange={changeTime}
          onDoubleClick={fastForward}
        />
        <VolumeControl volume={volume} onVolumeChange={changeVolume} />
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.audio?.url || currentTrack.music?.audio?.url}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerController;
