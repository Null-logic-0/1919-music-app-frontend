"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import TableComponent from "../TableComponent/TableComponent";
import styles from "./AllMusics.module.scss";
import Spinner from "../LoadingSpiner/Spiner";
import { useRecoilState } from "recoil";
import {
  currentTrackIndexState,
  musicTracksState,
  playbackStatusState,
} from "@/app/helpers/State";
import { PlaybackStatus } from "@/app/enums/player.enums";
import { SongInterface } from "@/app/interfaces/Song.interface";
import SearchMusic from "./SearchMusic/SearchMusic";
import axios from "axios";

const AllMusics = () => {
  const [musicData, setMusicData] = useState<SongInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchMusicData();
  }, []);

  const fetchMusicData = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const response = await fetch(
        "https://one919-backend-1.onrender.com/music",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setMusicData(data);
      setMusicTracks(data);
    } catch (err) {
      setError("Failed to fetch music data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const response = await axios.get(
        `https://one919-backend-1.onrender.com/music/search?q=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMusicData(response.data);
    } catch (error) {}
  };

  const fetchSongById = async (
    songId: string
  ): Promise<SongInterface | null> => {
    try {
      const token = localStorage.getItem("accesstoken");
      const response = await fetch(
        `https://one919-backend-1.onrender.com/music/${songId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      setError("Failed to fetch song by ID");
    }
    return null;
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

  const filteredMusicData = musicData.filter((music) =>
    music.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.Spinner}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.search}>
        <SearchMusic
          setSearchTerm={setSearchTerm}
          placeHolder={"search music"}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          icon
        />
      </div>

      <TableComponent
        replaceButton={false}
        dataSource={filteredMusicData}
        onPlayMusic={(song: SongInterface) => handleSongClick(song.id)}
        hide={false}
        like={true}
      />
      <audio ref={audioRef} controls hidden />
    </div>
  );
};

export default AllMusics;
