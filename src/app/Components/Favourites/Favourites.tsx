'use client'
import { useEffect, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import styles from "./Favourites.module.scss";
import axios from "axios";
import Spinner from "../LoadingSpiner/Spiner";
import { favouriteInterface } from "@/app/interfaces/favourite.interface";

const Favourites = () => {
  const [favouritesData, setFavouritesData] = useState<favouriteInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem('accesstoken');
        const response = await axios.get(
          "https://one919-backend.onrender.com/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavouritesData(response.data);
      } catch (error) {
        setError("Failed to fetch Favourites data");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleRemove = async (musicID: string) => {
    try {
      const token = localStorage.getItem('accesstoken');

      const musicIDAsNumber = Number(musicID);

      await axios.delete(
        `https://one919-backend.onrender.com/favorites/deleteMusic/${musicIDAsNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavouritesData((prevData) =>
        prevData.filter((music) => music.id !== musicIDAsNumber)
      );
    } catch (error) {
      setError("Failed to remove music from favourites");
    }
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Favourites Music</h2>
      {loading ? (
        <div><Spinner/></div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <TableComponent
          dataSource={favouritesData}
          replaceButton={true}
          remove={handleRemove} 
        />
      )}
    </div>
  );
};

export default Favourites;
