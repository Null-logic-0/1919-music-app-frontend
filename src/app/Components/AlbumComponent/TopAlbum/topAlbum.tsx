import React, { useState } from "react";
import AlbumCard from "../../AlbumCard/Card";
import { AlbumData} from "./AlbumData";
import styles from './albumStyles.module.scss';
import CardSubtitle from "../../AlbumCard/CardSubtitle/CardSubtitle";
import Card from "../../AlbumCard/Card";
import CardTitle from "../../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant, imageSizeVariants } from "../../../enums/imageSizeVariants";
import Heading from "../../Heading/Heading";



const TopAlbum = () => {
  const [currentAlbums] = useState(AlbumData);

  return (
  
    <div className={styles.container}>
        <Heading title="Top Album" />
      <div className={styles.albumWrapper}>
        {currentAlbums.map((item,index) => (   
        <Card 
         key={index}
         images={item.image} 
         title={item.title} subtitle={item.subtitle} 
         showDetails  
         direction="column" 
         imageSizeVariant={ImageSizeVariant.Medium}
         />          
        ))}
      </div>
    </div>
  );
};

export default TopAlbum;
