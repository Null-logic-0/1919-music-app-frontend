"use client";
import React, { useState, useEffect } from "react";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Albums.module.scss";
import axios from "axios";
import { photoInterface } from "@/app/interfaces/photo.interface";
import Link from "next/link";

interface Album {
  id: number;
  photo: photoInterface;
}

const Albums = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "https://one919-backend-1.onrender.com/album/top",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAlbums(response.data);
      } catch (error) {}
    };

    fetchAlbums();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Albums" />
        <div className={styles.button}>
          <Link href={"/topalbum"}>
            <span className={styles.seeMore}>see more</span>
          </Link>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {albums.map((album) => (
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
