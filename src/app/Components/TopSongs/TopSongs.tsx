"use client";
import { useState, useEffect } from "react";
import styles from "./TopSongs.module.scss";
import Dropdown from "../dropDown/dropDown";
import DayWeekDRP from "../dropDown/DayWeekDropContent/DayWeek";
import SongItem from "./SongItem/SongsItem";
import axios from "axios";
import { SongInterface } from "@/app/interfaces/Song.interface";
import { useRecoilState } from "recoil";
import { PlaybackStatus } from "@/app/enums/player.enums";
import {
  currentTrackIndexState,
  musicTracksState,
  playbackStatusState,
} from "@/app/helpers/State";
import Spinner from "../LoadingSpiner/Spiner";

const TopSongs = () => {
  const [songsData, setSongsData] = useState<SongInterface[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Week");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [musicTracks, setMusicTracks] = useRecoilState(musicTracksState);
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(
    currentTrackIndexState
  );
  const [playbackStatus, setPlaybackStatus] =
    useRecoilState(playbackStatusState);

  const accessToken = localStorage.getItem("accesstoken");

  const toggleShowAll = () => setShowAll((prevShowAll) => !prevShowAll);
  const songsDisplay = showAll ? songsData : songsData.slice(0, 4);

  const onOptionSelected = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        let endpoint = "";
        switch (selectedOption.toLowerCase()) {
          case "day":
            endpoint = "https://one919-backend-1.onrender.com/music/day";
            break;
          case "week":
            endpoint = "https://one919-backend-1.onrender.com/music/week";
            break;
          case "month":
            endpoint = "https://one919-backend-1.onrender.com/music/month";
            break;
          default:
            endpoint = "https://one919-backend-1.onrender.com/music/week";
        }
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSongsData(response.data);
        setMusicTracks(response.data);
      } catch (error) {
        setError("Failed to fetch songs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [selectedOption, accessToken, setMusicTracks]);

  const handleSongClick = (songId: string) => {
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
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.headingWrapper}>
        <div className={styles.heading}>
          <div className={styles.header}>
            <h2 className={styles.title}>Top 10 songs</h2>
            <Dropdown button={selectedOption}>
              <DayWeekDRP onOptionSelected={onOptionSelected} />
            </Dropdown>
          </div>

          <button className={styles.toggleButton} onClick={toggleShowAll}>
            {showAll ? "Show Less" : "See All"}
          </button>
        </div>
      </div>

      <div className={styles.container}>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          songsDisplay.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index}
              isPlaying={
                currentTrackIndex === index &&
                playbackStatus === PlaybackStatus.PLAYING
              }
              onclick={() => handleSongClick(song.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TopSongs;
