"use client";
import React, { useState, useEffect } from "react";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Hits.module.scss";
import { photoInterface } from "@/app/interfaces/photo.interface";
import axios from "axios";
import Link from "next/link";

interface Hits {
  id: number;
  photo: photoInterface;
}

const Hits = () => {
  const [hits, setHits] = useState<Hits[]>([]);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "https://one919-backend-1.onrender.com/album/topHits",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setHits(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchHits();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Hits" />
        <div className={styles.button}>
          <Link href={"/tophits"}>
            <span className={styles.seeMore}>see more</span>
          </Link>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {hits.map((item) => (
            <Card
              key={item.id}
              images={item.photo.url}
              imageSizeVariant={ImageSizeVariant.Medium}
              link={`/tophits/${item.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hits;
