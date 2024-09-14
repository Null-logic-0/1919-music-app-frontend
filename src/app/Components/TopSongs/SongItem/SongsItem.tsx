"use client";
import React from "react";
import styles from "./SongItem.module.scss";
import { SongInterface } from "@/app/interfaces/Song.interface";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import Card from "../../AlbumCard/Card";
import HeartLike from "../../HeartLike/HeartLike";
import MultiTaskButton from "../../MultiTaskButton/MultiTaskButton";
import { PlaybackStatus } from "@/app/enums/player.enums";

interface SongItemProps {
  song: SongInterface;
  index: number;
  isPlaying: boolean;
  onclick: () => void;
}

const SongItem = ({ song, index, isPlaying, onclick }: SongItemProps) => {
  return (
    <div className={styles.tableRow}>
      <div className={styles.imageWrapper}>
        <span className={styles.count}>{index + 1}</span>
        <Card
          images={song.photo.url}
          direction="row"
          imageSizeVariant={ImageSizeVariant.Small}
          showDetails
          name={song.name}
          authorName={song.authorName}
        />
      </div>

      <div className={styles.action}>
        <MultiTaskButton
          icon={isPlaying ? "/Icons/toPause.svg" : "/Icons/toPlay.svg"}
          onclick={onclick}
        />
        <HeartLike />
      </div>
    </div>
  );
};

export default SongItem;
