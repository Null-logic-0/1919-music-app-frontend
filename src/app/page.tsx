'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Artist from "./Components/HomePage/Artists/Artist";
import Albums from "./Components/HomePage/Albums/Albums";
import TopSongs from "./Components/TopSongs/TopSongs";
import Hits from "./Components/HomePage/Hits/Hits";
import Charts from "./Components/HomePage/Charts/Charts";

export default function Home() {
  return (
    <main className={styles.main}>
      
      
        <Artist />
        <Albums/>
        <TopSongs/>
        <Hits/>
        <Charts/>


    </main>
  );
}
