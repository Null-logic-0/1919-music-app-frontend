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
import { useRecoilState } from 'recoil';
import { currentTrackState } from '../../helpers/State';  

const SinglePlaylist = () => {
  const [playlist, setPlaylist] = useState<ArtistInterface | null>(null);
  const [musicList, setMusicList] = useState<SongInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRecommended, setShowRecommended] = useState(false);
  const { id: playlistIdParam } = useParams();
  const playlistId = Array.isArray(playlistIdParam) ? playlistIdParam[0] : playlistIdParam;
  
  const [, setCurrentTrack] = useRecoilState(currentTrackState);

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
          setPlaylist(response.data);
          setMusicList(response.data.music || []); 
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
  }, [playlistId]);

  useEffect(() => {
    const fetchMusicList = async () => {
      const token = localStorage.getItem("accesstoken");

      if (playlistId) {
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
        } catch (err) {
          setError("Failed to load music list");
        }
      }
    };

    fetchMusicList();
  }, [playlistId]);

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
      } else if (!searchTerm) {
        const response = await axios.get(
          `https://one919-backend.onrender.com/music/InPlaylist/${playlistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMusicList(response.data || []); 
      }
    };

    searchMusic();
  }, [playlistId, searchTerm]);

  const handleAddMusicToPlaylist = async (musicId: string) => {
    const token = localStorage.getItem("accesstoken");

    if (!playlistId || !musicId) {
      console.error("Playlist ID or Music ID is missing");
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
    } catch (error) {
      console.error("Failed to add music to playlist", error);
    }
  };

  const handleDeleteMusicFromPlaylist = async (musicId: string) => {
    const token = localStorage.getItem("accesstoken");

    if (!playlistId || !musicId) {
      console.error("Playlist ID or Music ID is missing");
      return;
    }

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
    } catch (error) {
      console.error("Failed to delete music from playlist", error);
    }
  };

  const handleAddMusic = () => {
    setShowRecommended(true);
  };

  const handleClose = () => {
    setShowRecommended(false);
  };

  const handlePlayMusic = useCallback((track: SongInterface) => {
    setCurrentTrack(track);  
  }, [setCurrentTrack]);

  if (loading) return <p className={styles.alert}>Loading...</p>;
  if (error) return <p className={styles.alert}>{error}</p>;

  const isTableFull = Array.isArray(musicList) && musicList.length > 0;

  return (
    <div className={styles.main}>
      <PagesHeaderTop link="/playlist" />
      <div className={styles.container}>
        {playlist && (
          <>
            <div className={styles.playlistHeader}>
              <PlaylistHeader
                playlist={playlist}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                addMusics={handleAddMusic}
                isTablefull={isTableFull}
              />
            </div>

            {isTableFull ? (
              <TableComponent
                replaceButton={true}
                dataSource={musicList}
                addMusic={handleAddMusicToPlaylist}
                remove={handleDeleteMusicFromPlaylist} 
                onPlayMusic={handlePlayMusic}  
              />
            ) : (
              playlistId && (
                <Recomended
                  playlistId={playlistId}
                  addMusic={handleAddMusicToPlaylist}
                />
              )
            )}
          </>
        )}
      </div>

      {showRecommended && playlistId && (
        <Recomended
          playlistId={playlistId}
          onclick={handleClose}
          addMusic={handleAddMusicToPlaylist}
        />
      )}
    </div>
  );
};

export default SinglePlaylist;
