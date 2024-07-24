import React, { useState } from "react";
import AlbumCard from "../AlbumCard/Card";
import styles from './TopCarts.module.scss';
import CardSubtitle from "../AlbumCard/CardSubtitle/CardSubtitle";
import CardTitle from "../AlbumCard/CardTitle/CardTitle";
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const CartsmData = [
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  { title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopCarts = () => {

  return (
  
    <div className={styles.container}>
        <Heading title="Top Chrts" />
      <div className={styles.albumWrapper}>
        {CartsmData.map((item,index) => (   
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

export default TopCarts;
