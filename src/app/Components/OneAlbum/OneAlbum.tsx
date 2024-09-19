"use client";
import styles from "./OneAlbum.module.scss";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";
import Card from "../AlbumCard/Card";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import { ArtistInterface } from "@/app/interfaces/Artist.interface";
import TableComponent from "../TableComponent/TableComponent";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  currentTrackIndexState,
  musicTracksState,
  playbackStatusState,
} from "@/app/helpers/State";
import { PlaybackStatus } from "@/app/enums/player.enums";
import { SongInterface } from "@/app/interfaces/Song.interface";
import Spinner from "../LoadingSpiner/Spiner";

const OneAlbum = () => {
  const [album, setAlbum] = useState<ArtistInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: albumIdParam } = useParams();
  const albumId = Array.isArray(albumIdParam) ? albumIdParam[0] : albumIdParam;

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      const token = localStorage.getItem("accesstoken");

      if (!token) {
        setError("Access token is missing. Please log in again.");
        setLoading(false);
        return;
      }

      if (albumId) {
        try {
          const response = await axios.get<ArtistInterface>(
            `https://one919-backend-1.onrender.com/album/${albumId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAlbum(response.data);
          // @ts-ignore
          setMusicTracks(response.data.musics || []);
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.status === 403) {
            setError(
              "Access denied: You do not have permission to view this album."
            );
          } else {
            setError("Failed to fetch album data.");
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError("Invalid album ID.");
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId, setMusicTracks]);

  const fetchSongById = async (
    songId: string
  ): Promise<SongInterface | null> => {
    try {
      const token = localStorage.getItem("accesstoken");
      const response = await axios.get<SongInterface>(
        `https://one919-backend-1.onrender.com/music/${songId}`,
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
  if (!album) return <div>No album data available.</div>;

  return (
    <div className={styles.main}>
      <PagesHeaderTop link="/topalbum" />
      <div className={styles.card}>
        <Card
          images={album.photo.url}
          name={album.title}
          authorName={album.firstName}
          showDetails
          imageSizeVariant={ImageSizeVariant.Large}
          direction="row"
        />
      </div>
      <div className={styles.table}>
        <TableComponent
          replaceButton={false}
          dataSource={album.musics}
          onPlayMusic={(song: SongInterface) => handleSongClick(song.id)}
          hide={false}
        />
      </div>
      <audio ref={audioRef} controls hidden />
    </div>
  );
};

export default OneAlbum;
