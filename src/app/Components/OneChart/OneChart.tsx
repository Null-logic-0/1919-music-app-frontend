"use client";
import styles from "./OneChart.module.scss";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";
import TableComponent from "@/app/Components/TableComponent/TableComponent";
import Card from "../AlbumCard/Card";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import { ArtistInterface } from "@/app/interfaces/Artist.interface";
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

const OneChart = () => {
  const [charts, setCharts] = useState<ArtistInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: chartsIdParam } = useParams();
  const chartsId = Array.isArray(chartsIdParam)
    ? chartsIdParam[0]
    : chartsIdParam;

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchChartsData = async () => {
      const token = localStorage.getItem("accesstoken");
      if (chartsId) {
        try {
          const response = await axios.get<ArtistInterface>(
            `https://one919-backend.onrender.com/album/${chartsId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCharts(response.data);
          setMusicTracks(response.data.musics || []);
        } catch (err) {
          setError("Failed to fetch charts data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChartsData();
  }, [chartsId, setMusicTracks]);

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
        console.warn(`Song with ID ${songId} not found in musicTracks`);
      }
    },
    [currentTrackIndex, musicTracks, setCurrentTrackIndex, setPlaybackStatus]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && musicTracks.length > 0 && musicTracks[currentTrackIndex]) {
      if (playbackStatus === PlaybackStatus.PLAYING) {
        audio.play().catch((err) => console.error("Error playing audio:", err));
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
        audio.play().catch((err) => console.error("Error playing audio:", err));
      }
    }
  }, [currentTrackIndex, musicTracks, playbackStatus]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!charts) return <div>No chart data available</div>;

  return (
    <div className={styles.main}>
      <PagesHeaderTop link="/topcharts" />
      <div className={styles.card}>
        <Card
          images={charts.photo.url}
          name={charts.title}
          authorName={charts.authorName}
          showDetails
          imageSizeVariant={ImageSizeVariant.Large}
          direction="row"
        />
      </div>
      <div className={styles.table}>
        <TableComponent
          replaceButton={false}
          dataSource={charts.musics}
          onPlayMusic={(song: SongInterface) => handleSongClick(song.id)}
          hide={false}
        />
      </div>
    </div>
  );
};

export default OneChart;
