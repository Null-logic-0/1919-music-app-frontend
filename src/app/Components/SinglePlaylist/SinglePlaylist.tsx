"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import PagesHeaderTop from "../PagesHeaderTop/PagesHeaderTop";
import styles from "./SinglePlaylist.module.scss";
import { ArtistInterface } from "@/app/interfaces/Artist.interface";
import TableComponent from "../TableComponent/TableComponent";
import Recomended from "./Recomended/Recomended";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import { useParams } from "next/navigation";
import { SongInterface } from "@/app/interfaces/Song.interface";
import { useRecoilState } from "recoil";
import {
  currentTrackIndexState,
  musicTracksState,
  playbackStatusState,
} from "@/app/helpers/State";
import { PlaybackStatus } from "@/app/enums/player.enums";
import Spinner from "../LoadingSpiner/Spiner";

const SinglePlaylist = () => {
  const [playlist, setPlaylist] = useState<ArtistInterface | null>(null);
  const [musicList, setMusicList] = useState<SongInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRecommended, setShowRecommended] = useState(false);
  const { id: playlistIdParam } = useParams();
  const playlistId = Array.isArray(playlistIdParam)
    ? playlistIdParam[0]
    : playlistIdParam;

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const token = localStorage.getItem("accesstoken");
      if (playlistId) {
        try {
          const response = await axios.get(
            `https://one919-backend-1.onrender.com/playlist/${playlistId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPlaylist(response.data);
          setMusicList(response.data.musics);
          setMusicTracks(response.data.musics);
        } catch (error) {
          setError("Failed to load playlist");
        } finally {
          setLoading(false);
        }
      } else {
        setError("Playlist ID is missing");
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId, setMusicTracks]);

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

  const handleAddMusicToPlaylist = async (musicId: string) => {
    const token = localStorage.getItem("accesstoken");

    if (!playlistId || !musicId) {
      return;
    }

    try {
      await axios.put(
        `https://one919-backend-1.onrender.com/playlist/${playlistId}/music/${musicId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        `https://one919-backend-1.onrender.com/music/InPlaylist/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMusicList(response.data || []);
      setShowRecommended(false);
    } catch (error) {
      console.error("Error adding music to playlist:", error);
    }
  };

  const handleDeleteMusicFromPlaylist = async (musicId: string) => {
    const token = localStorage.getItem("accesstoken");

    try {
      await axios.delete(
        `https://one919-backend-1.onrender.com/playlist/${playlistId}/music/${musicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(
        `https://one919-backend-1.onrender.com/music/InPlaylist/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMusicList(response.data || []);
    } catch (error) {
      console.error("Error deleting music from playlist:", error);
    }
  };

  if (loading)
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  if (error) return <p className={styles.alert}>{error}</p>;

  const isTableFull = musicList.length > 0;
  const isEmpty = musicList.length === 0;

  return (
    <div className={styles.main}>
      <PagesHeaderTop link="/createdPlaylists" />
      <div className={styles.container}>
        {playlist && (
          <>
            <div className={styles.playlistHeader}>
              <PlaylistHeader
                playlist={playlist}
                addMusics={() => setShowRecommended(true)}
                isTablefull={isTableFull}
              />
            </div>
            <div className={styles.tables}>
              {showRecommended && playlistId && (
                <Recomended
                  playlistId={playlistId}
                  onclick={() => setShowRecommended(false)}
                  addMusic={handleAddMusicToPlaylist}
                  onPlayMusic={(song) => handleSongClick(song.id)}
                  hide={true}
                />
              )}
              {isTableFull && (
                <TableComponent
                  replaceButton={true}
                  dataSource={musicList}
                  addMusic={handleAddMusicToPlaylist}
                  remove={handleDeleteMusicFromPlaylist}
                  onPlayMusic={(song) => handleSongClick(song.id)}
                  hide={true}
                />
              )}
              {isEmpty && playlistId && (
                <Recomended
                  playlistId={playlistId}
                  addMusic={handleAddMusicToPlaylist}
                  onPlayMusic={(song) => handleSongClick(song.id)}
                  hide={true}
                />
              )}
            </div>
          </>
        )}
      </div>
      <audio ref={audioRef} controls hidden />
    </div>
  );
};

export default SinglePlaylist;
