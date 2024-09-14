"use client";
import React, { useEffect, useState } from "react";
import styles from "./TopArtist.module.scss";
import { ImageSizeVariant } from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import Link from "next/link";
import axios from "axios";
import { photoInterface } from "@/app/interfaces/photo.interface";

interface Artist {
  id:number;
  photo:photoInterface;
  firstName:string;
  lastName:string;
}

const TopArtist = () => {
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
        try {
            const token = localStorage.getItem('accesstoken'); 

            const response = await axios.get('https://one919-backend.onrender.com/author/top', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            console.log(response,'zd');
            

            setArtistData(response.data);
        } catch (error) {
            setError('Failed to fetch artist data');
        } finally {
            setLoading(false);
        }
    };

    fetchArtists();
}, []);
  return (
    <div className={styles.container}>
      <Heading title="Top Artists" />
      <div className={styles.albumWrapper}>
        {artistData.map((artist) => (
          <Card
            link={`/topartist/${artist.id}`}
            key={artist.id}
            images={artist.photo.url}
            name={artist.firstName}
            authorName={artist.lastName}
            showDetails
            direction="column"
            imageSizeVariant={ImageSizeVariant.RoundedXL}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
