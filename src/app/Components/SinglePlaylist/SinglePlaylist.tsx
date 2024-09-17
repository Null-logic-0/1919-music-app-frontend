"use client";
import { useState, useEffect, useCallback } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    const fetchPlaylist = async () => {
      const token = localStorage.getItem("accesstoken");
      if (playlistId) {
        try {
          const response = await axios.get(
            `https://one919-backend.onrender.com/playlist/${playlistId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data, "response.data");
          setPlaylist(response.data);
          setMusicList(response.data.musics);
          setMusicTracks(response.data.musics);
        } catch (error) {
          console.error("Error fetching playlist:", error);
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

  useEffect(() => {
    const searchMusic = async () => {
      const token = localStorage.getItem("accesstoken");
      if (searchTerm && playlistId) {
        try {
          const response = await axios.get(
            `https://one919-backend.onrender.com/search?q=${searchTerm}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMusicList(response.data || []);
        } catch (error) {
          setError("Failed to search music");
        }
      } else if (!searchTerm && playlistId) {
        try {
          const response = await axios.get(
            `https://one919-backend.onrender.com/music/InPlaylist/${playlistId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMusicList(response.data || []);
        } catch (error) {
          setError("Failed to load music list");
        }
      }
    };

    searchMusic();
  }, [playlistId, searchTerm]);

  const handleAddMusicToPlaylist = async (musicId: string) => {
    const token = localStorage.getItem("accesstoken");

    if (!playlistId || !musicId) {
      return;
    }

    try {
      await axios.put(
        `https://one919-backend.onrender.com/playlist/${playlistId}/music/${musicId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const response = await axios.get(
        `https://one919-backend.onrender.com/music/InPlaylist/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMusicList(response.data || []);
      setShowRecommended(false);
    } catch (error) {}
  };

  const handleDeleteMusicFromPlaylist = async (musicId: string) => {
    const token = localStorage.getItem("accesstoken");

    try {
      await axios.delete(
        `https://one919-backend.onrender.com/playlist/${playlistId}/music/${musicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(
        `https://one919-backend.onrender.com/music/InPlaylist/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMusicList(response.data || []);
    } catch (error) {}
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
      }
    },
    [currentTrackIndex, musicTracks, setCurrentTrackIndex, setPlaybackStatus]
  );

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
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                addMusics={() => setShowRecommended(true)}
                isTablefull={isTableFull}
              />
            </div>
            <div className={styles.tables}>
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
              {showRecommended && playlistId && (
                <Recomended
                  playlistId={playlistId}
                  onclick={() => setShowRecommended(false)}
                  addMusic={handleAddMusicToPlaylist}
                  onPlayMusic={(song) => handleSongClick(song.id)}
                  hide={true}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePlaylist;
