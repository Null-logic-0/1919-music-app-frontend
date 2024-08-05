import React, { useState } from "react";
import AlbumCard from "../AlbumCard/Card";
import styles from './TopAlbum.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant } from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


const AlbumData = [
  { id:1,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:2,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:3,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:4,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:5,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:6,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:7,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
  { id:8,title: 'Song Name', image: "/images/albumCard.png", subtitle: '100 song' },
];





const TopAlbum = () => {

  return (

    <div className={styles.container}>
      <Heading title="Top Album" />
      <div className={styles.albumWrapper}>
        {AlbumData.map((item, id) => (

          <Card
            link={`/topalbum/${item.id}`}
            key={id}
            images={item.image}
            title={item.title} subtitle={item.subtitle}
            showDetails
            direction="column"
            imageSizeVariant={ImageSizeVariant.Absolute}
          />


        ))}
      </div>
    </div>
  );
};

export default TopAlbum;
