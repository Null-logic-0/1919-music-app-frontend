"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Artist.module.scss";
import { photoInterface } from "@/app/interfaces/photo.interface";
import Spinner from "../LoadingSpiner/Spiner";
import Link from "next/link";

interface Artist {
  id: number;
  photo: photoInterface;
}

const Artist = () => {
  const [artistData, setArtistData] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const token = localStorage.getItem("accesstoken");

        const response = await axios.get(
          "https://one919-backend.onrender.com/author/top",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setArtistData(response.data);
      } catch (error) {
        setError("Failed to fetch artist data");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  

  if (loading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Artists"/>
        <div className={styles.button}>
            <Link href={'/topartist'}>
                <span className={styles.seeMore}>see more</span>
            </Link>
        </div>
      </div>
      <div className={styles.cards}>
        {artistData.map((item) => (
          <Card
            key={item.id}
            images={item.photo.url}
            imageSizeVariant={ImageSizeVariant.Rounded}
            link={`/topartist/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Artist;
