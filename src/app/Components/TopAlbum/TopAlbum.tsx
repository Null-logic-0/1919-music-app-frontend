'use client'
import React, { useEffect, useState } from "react";
import styles from './TopAlbum.module.scss';
import { ImageSizeVariant } from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import axios from "axios";
import { photoInterface } from "@/app/interfaces/photo.interface";

interface Album {
  id: number;
  photo:photoInterface;
  title:string;
}


const TopAlbum = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

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

 
  

  return (

    <div className={styles.container}>
      <Heading title="Top Album" />
      <div className={styles.albumWrapper}>
        {albums.map((item) => (

          <Card
            link={`/topalbum/${item.id}`}
            key={item.id}
            images={item.photo.url}
            name={item.title} 
            showDetails
            direction="column"
            imageSizeVariant={ImageSizeVariant.Medium}
          />


        ))}
      </div>
    </div>
  );
};

export default TopAlbum;
