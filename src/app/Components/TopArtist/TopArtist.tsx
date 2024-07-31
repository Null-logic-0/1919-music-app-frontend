import React, { useState } from "react";
import AlbumCard from "../AlbumCard/Card";
import styles from './TopArtist.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const ArtistData = [
  { id:1,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:2,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:3,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:4,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:5,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:6,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:7,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:8,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopArtist = () => {
  return (
  
    <div className={styles.container}>
        <Heading title="Top Artist" />
      <div className={styles.albumWrapper}>
        {ArtistData.map((item,id) => (   
        <Card 
         key={item.id}
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
