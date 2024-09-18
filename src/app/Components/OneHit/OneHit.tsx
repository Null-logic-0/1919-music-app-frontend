"use client";
import styles from "./OneHit.module.scss";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";
import Card from "../AlbumCard/Card";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import { ArtistInterface } from "@/app/interfaces/Artist.interface";
import TableComponent from "../TableComponent/TableComponent";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  currentTrackIndexState,
  musicTracksState,
  playbackStatusState,
} from "@/app/helpers/State";
import { PlaybackStatus } from "@/app/enums/player.enums";
import { SongInterface } from "@/app/interfaces/Song.interface";
import Spinner from "../LoadingSpiner/Spiner";

const OneHit = () => {
  const [hits, setHits] = useState<ArtistInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: hitsIdParam } = useParams();
  const hitsId = Array.isArray(hitsIdParam) ? hitsIdParam[0] : hitsIdParam;

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchHitsData = async () => {
      const token = localStorage.getItem("accesstoken");
      if (hitsId) {
        try {
          const response = await axios.get<ArtistInterface>(
            `https://one919-backend.onrender.com/album/${hitsId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setHits(response.data);
          // @ts-ignore
          setMusicTracks(response.data.musics || []);
        } catch (err) {
          setError("Failed to fetch artist data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHitsData();
  }, [hitsId, setMusicTracks]);

  const fetchSongById = async (
    songId: string
  ): Promise<SongInterface | null> => {
    try {
      const token = localStorage.getItem("accesstoken");
      const response = await axios.get<SongInterface>(
        `https://one919-backend.onrender.com/music/${songId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(`Failed to fetch song with ID ${songId}:`, err);
      return null;
    }
  };

  const handleSongClick = useCallback(
    async (songId: string) => {
      const songData = await fetchSongById(songId);
      if (songData && audioRef.current) {
        // Update the audio source and play the song
        audioRef.current.src = songData.audioUrl || "";
        setCurrentTrackIndex(
          musicTracks.findIndex((track) => track.id === songId)
        );
        setPlaybackStatus(PlaybackStatus.PLAYING);
        audioRef.current.play();
      } else {
        console.warn(`Song with ID ${songId} not found`);
      }
    },
    [setCurrentTrackIndex, musicTracks, setPlaybackStatus]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && playbackStatus === PlaybackStatus.PLAYING) {
      audio.play().catch((err) => console.error("Error playing audio:", err));
    } else if (audio && playbackStatus === PlaybackStatus.PAUSED) {
      audio.pause();
    }
  }, [playbackStatus]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && musicTracks[currentTrackIndex]) {
      const currentTrack = musicTracks[currentTrackIndex];
      audio.src = currentTrack.audioUrl || "";
      if (playbackStatus === PlaybackStatus.PLAYING) {
        audio.play().catch((err) => console.error("Error playing audio:", err));
      }
    }
  }, [currentTrackIndex, musicTracks, playbackStatus]);

  if (loading)
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!hits) return <div>No artist data available</div>;

  return (
    <div className={styles.main}>
      <PagesHeaderTop link="/tophits" />
      <div className={styles.card}>
        <Card
          images={hits.photo.url}
          name={hits.name}
          authorName={hits.authorName}
          showDetails
          imageSizeVariant={ImageSizeVariant.Large}
          direction="row"
        />
      </div>

      <div className={styles.table}>
        <TableComponent
          replaceButton={false}
          dataSource={hits.musics}
          onPlayMusic={(song: SongInterface) => handleSongClick(song.id)}
          hide={false}
        />
      </div>
      <audio ref={audioRef} controls hidden />
    </div>
  );
};

export default OneHit;
