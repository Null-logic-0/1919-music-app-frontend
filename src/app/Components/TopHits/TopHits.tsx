import React, { useState } from "react";
import styles from './TopHits.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const HitsData = [
  { id:1,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:2,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:3,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:4,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:5,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:6,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:7,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { id:8,title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopHits = () => {
  return (
  
    <div className={styles.container}>
        <Heading title="Top Hits" />
      <div className={styles.albumWrapper}>
        {HitsData.map((item,id) => (   
        <Card 
         link={`/tophits/${item.id}`}
         key={id}
         images={item.image} 
         title={item.title} subtitle={item.subtitle} 
         showDetails  
         direction="column" 
         imageSizeVariant={ImageSizeVariant.Absolute}
         />          
        ))}
      </div>
    </div>
  );
};

export default TopHits;
