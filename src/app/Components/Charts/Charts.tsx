"use client";
import React, { useState, useEffect } from "react";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Charts.module.scss";
import SeeAllButton from "../SeeAllButton/SeeAllButton";
import CardsHelper from "@/app/helpers/CardsHelper";
import { photoInterface } from "@/app/interfaces/photo.interface";
import axios from "axios";

interface Charts {
  id: number;
  photo: photoInterface;
}

const Charts = () => {
  const [charts, setCharts] = useState<Charts[]>([]);
  const [showAll, setShowAll] = useState<boolean>(false);
  const cardsToShow = CardsHelper();

  useEffect(() => {
    const fetchHits = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        const response = await axios.get(
          "https://one919-backend.onrender.com/album/top",
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

  const toggleShowAll = () => setShowAll((prevShowAll) => !prevShowAll);

  const trimmedData = showAll ? charts : charts.slice(0, cardsToShow);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Charts" link="/topcharts" />
        <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {trimmedData.map((item) => (
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
