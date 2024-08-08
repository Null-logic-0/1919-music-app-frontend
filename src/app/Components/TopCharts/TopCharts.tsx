'use client'
import React, { useState } from "react";
import styles from './TopCharts.module.scss';
import { ImageSizeVariant} from "../../enums/imageSizeVariants";
import Card from "../AlbumCard/Card";
import Heading from "../Heading/Heading";


 const ChartsData = [
  {id:1, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:3, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:4, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:5, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:6, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:7, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:8, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'},
  {id:9, title:'Song Name', image: "/images/albumCard.png",subtitle:'100 song'}, 
];





const TopCharts = () => {

  return (
  
    <div className={styles.container}>
        <Heading title="Top Charts" />
      <div className={styles.albumWrapper}>
        {ChartsData.map((item,id) => (   
        <Card 
         link={`/topcharts/${item.id}`}
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
