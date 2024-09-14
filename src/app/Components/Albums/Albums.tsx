"use client";
import React, { useState, useEffect } from "react";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Albums.module.scss";
import SeeAllButton from "../SeeAllButton/SeeAllButton";
import CardsHelper from "@/app/helpers/CardsHelper";
import axios from "axios";
import { photoInterface } from "@/app/interfaces/photo.interface";


interface Album {
    id: number;
    photo:photoInterface
  }

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const cardsToShow = CardsHelper();
 

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const accessToken = localStorage.getItem('accesstoken');;
        const response = await axios.get(
          "https://one919-backend.onrender.com/album/top",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  const toggleShowAll = () => setShowAll((prevShowAll) => !prevShowAll);

  const trimmedData = showAll ? albums : albums.slice(0, cardsToShow);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Albums" link="/topalbum" />
        <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {trimmedData.map((album) => (
            <Card
              key={album.id}
              images={album.photo.url}
              imageSizeVariant={ImageSizeVariant.Medium}
              link={`/topalbum/${album.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Albums;
