"use client";
import React, { useState, useEffect } from "react";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Charts.module.scss";
import { photoInterface } from "@/app/interfaces/photo.interface";
import axios from "axios";
import Link from "next/link";

interface Charts {
  id: number;
  photo: photoInterface;
}

const Charts = () => {
  const [charts, setCharts] = useState<Charts[]>([]);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "https://one919-backend.onrender.com/album/topCharts",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCharts(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchHits();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Charts" />
        <div className={styles.button}>
          <Link href={"/topcharts"}>
            <span className={styles.seeMore}>see more</span>
          </Link>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {charts.map((item) => (
            <Card
              key={item.id}
              images={item.photo.url}
              imageSizeVariant={ImageSizeVariant.Medium}
              link={`/topcharts/${item.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
