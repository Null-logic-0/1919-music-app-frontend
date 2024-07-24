import React, { useState } from "react";
import AlbumCard from "../AlbumCard/Card";
import styles from './TopArtist.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const ArtistData = [
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopArtist = () => {
  return (
  
    <div className={styles.container}>
        <Heading title="Top Artist" />
      <div className={styles.albumWrapper}>
        {ArtistData.map((item,index) => (   
        <Card 
         key={index}
         images={item.image} 
         title={item.title} subtitle={item.subtitle} 
         showDetails  
         direction="column" 
         imageSizeVariant={ImageSizeVariant.RoundedXXL}
         />          
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
