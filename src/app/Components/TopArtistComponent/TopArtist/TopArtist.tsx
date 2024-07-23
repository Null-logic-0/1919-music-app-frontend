import React, { useState } from "react";
import AlbumCard from "../../AlbumCard/Card";
import { AlbumData} from "./ArtistData";
import styles from './TopArtist.module.scss';
import Card from "../../AlbumCard/Card";
import { ImageSizeVariant} from "../../../enums/imageSizeVariants";
import Heading from "../../Heading/Heading";



const TopArtist = () => {
  const [currentAlbums] = useState(AlbumData);

  return (
  
    <div className={styles.container}>
        <Heading title="Top Artist" />
      <div className={styles.albumWrapper}>
        {currentAlbums.map((item,index) => (   
        <Card 
         key={index}
         images={item.image} 
         title={item.title} subtitle={item.subtitle} 
         showDetails  
         direction="column" 
         imageSizeVariant={ImageSizeVariant.RoundedXL}
         />          
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
