import React, { useState } from "react";
import AlbumCard from "../AlbumCard/Card";
import styles from './TopCharts.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const ChartsData = [
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopCharts = () => {

  return (
  
    <div className={styles.container}>
        <Heading title="Top Charts" />
      <div className={styles.albumWrapper}>
        {ChartsData.map((item,id) => (   
        <Card 
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

export default TopCharts;
