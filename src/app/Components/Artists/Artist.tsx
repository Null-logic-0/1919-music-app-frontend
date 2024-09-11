"use client";
import React, { useEffect, useState } from "react";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./Artist.module.scss";
import SeeAllButton from "../SeeAllButton/SeeAllButton";
import ArtistsCardsHelper from "@/app/helpers/ArtistsCardsHelper";
import axios from "axios";
import { CardProps } from "antd";

const Artist = () => {
  const [artists, setArtists] = useState([]);
  const [showAll, setShowAll] = useState<boolean>(false);

  const cardsToShow = ArtistsCardsHelper();

  const toggleShowAll = () => setShowAll((prevShowAll) => !prevShowAll);

  useEffect(() => {
    const accesstoken = localStorage.getItem("accesstoken");

    if (!accesstoken) {
      console.error("Access token is missing. Please log in.");
      
      return;
    }

    console.log("Access Token:", accesstoken);

    axios
      .get("https://one919-backend.onrender.com/author/top", {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setArtists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Heading title="Top Artists" link="/topartist" />
        <SeeAllButton showAll={showAll} onclick={toggleShowAll} />
      </div>
      <div className={styles.cards}>
        {artists.map((item: CardProps) => (
          <Card
            key={item.id}
            photo={item.photo.url}
            imageSizeVariant={ImageSizeVariant.Rounded}
            link={`/topartist/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Artist;
