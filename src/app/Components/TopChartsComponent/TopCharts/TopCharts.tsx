import React, { useState } from "react";
import AlbumCard from "../../AlbumCard/Card";
import { AlbumData} from "./ChartsData";
import styles from './TopCharts.module.scss';
import Card from "../../AlbumCard/Card";
import { ImageSizeVariant} from "../../../enums/imageSizeVariants";
import Heading from "../../Heading/Heading";



const TopCharts = () => {
  const [currentAlbums] = useState(AlbumData);

  return (
  
    <div className={styles.container}>
        <Heading title="Top Charts" />
      <div className={styles.albumWrapper}>
        {currentAlbums.map((item,index) => (   
        <Card 
         key={index}
         images={item.image} 
         title={item.title} subtitle={item.subtitle} 
         showDetails  
         direction="column" 
         imageSizeVariant={ImageSizeVariant.XLarge}
         />          
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
