'use client'
import React, { useEffect, useState } from "react";
import styles from './TopHits.module.scss';
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";
import { photoInterface } from "@/app/interfaces/photo.interface";
import axios from "axios";


 
interface Hits {
  id:number;
  photo:photoInterface;
  title:string;
}



const TopHits = () => {
  const [hits,setHits]=useState<Hits[]>([]);
  
  useEffect(() => {
    const fetchHits = async () => {
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
        setHits(response.data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchHits();
  }, []);

  return (
  
    <div className={styles.container}>
        <Heading title="Top Hits" />
      <div className={styles.albumWrapper}>
        {hits.map((item) => (   
        <Card 
         link={`/tophits/${item.id}`}
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

export default TopHits;
