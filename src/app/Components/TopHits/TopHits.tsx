import React, { useState } from "react";
import styles from './TopHits.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const HitsData = [
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopHits = () => {
  return (
  
    <div className={styles.container}>
        <Heading title="Top Hits" />
      <div className={styles.albumWrapper}>
        {HitsData.map((item,id) => (   
        <Card 
         key={id}
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

export default TopHits;
