"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import TableComponent from "../TableComponent/TableComponent";
import styles from "./Favourites.module.scss";
import axios from "axios";
import Spinner from "../LoadingSpiner/Spiner";
import { favouriteInterface } from "@/app/interfaces/favourite.interface";
import { useRecoilState } from "recoil";
import {
  currentTrackIndexState,
  musicTracksState,
  playbackStatusState,
} from "@/app/helpers/State";
import { PlaybackStatus } from "@/app/enums/player.enums";
import { SongInterface } from "@/app/interfaces/Song.interface";

const Favourites = () => {
  const [favouritesData, setFavouritesData] = useState<favouriteInterface[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "https://one919-backend.onrender.com/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavouritesData(response.data);
        setMusicTracks(response.data);
      } catch (error) {
        setError("Failed to fetch Favourites data");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [setMusicTracks]);

  const handleRemove = async (musicID: string) => {
    try {
      const token = localStorage.getItem("accesstoken");

      const musicIDAsNumber = Number(musicID);

      await axios.delete(
        `https://one919-backend.onrender.com/favorites/deleteMusic/${musicIDAsNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavouritesData((prevData) =>
        prevData.filter((music) => music.id !== musicIDAsNumber)
      );
    } catch (error) {
      setError("Failed to remove music from favourites");
    }
  };

  const handleSongClick = useCallback(
    (songId: string) => {
      const trackIndex = musicTracks.findIndex((track) => track.id === songId);
      if (trackIndex !== -1) {
        if (currentTrackIndex === trackIndex) {
          setPlaybackStatus((prevStatus) =>
            prevStatus === PlaybackStatus.PLAYING
              ? PlaybackStatus.PAUSED
              : PlaybackStatus.PLAYING
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
      audio.src = currentTrack.audioUrl || "";
      if (playbackStatus === PlaybackStatus.PLAYING) {
        audio.play();
      } else if (playbackStatus === PlaybackStatus.PAUSED) {
        audio.pause();
      }
    }
  }, [currentTrackIndex, musicTracks, playbackStatus]);

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Favourite Musics</h2>
      {loading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TableComponent
          dataSource={favouritesData}
          replaceButton={true}
          remove={handleRemove}
          onPlayMusic={(song: SongInterface) => handleSongClick(song.id)}
          hide={true}
        />
      )}
      <audio ref={audioRef} controls hidden />
    </div>
  );
};

export default Favourites;
