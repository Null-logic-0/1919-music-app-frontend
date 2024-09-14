"use client";
import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import styles from "./TopCharts.module.scss";
import { ImageSizeVariant } from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { photoInterface } from "@/app/interfaces/photo.interface";
import axios from "axios";

interface Charts {
  id: number;
  photo: photoInterface;
  title: string;
}

const TopCharts = () => {
  const [charts, setCharts] = useState<Charts[]>([]);

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "https://one919-backend.onrender.com/music/charts",
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



const TopCharts = () => {
  return (
    <div className={styles.container}>
      <Heading title="Top Charts" />
      <div className={styles.albumWrapper}>
        {charts.map((item) => (
          <Card
            link={`/topcharts/${item.id}`}
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

export default TopCharts;
