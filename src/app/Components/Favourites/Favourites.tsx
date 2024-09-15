'use client'
import { useEffect, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import styles from "./Favourites.module.scss";
import axios from "axios";

const Favourites = () => {
  const [favouritesData, setFavouritesData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavouritres = async () => {
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

    fetchFavouritres();
  }, []);
  return (
    <>
      <h2 className={styles.header}>Favourites Music</h2>

      <TableComponent  dataSource={favouritesData} replaceButton={true} />
    </>
  );
};

export default Favourites;
