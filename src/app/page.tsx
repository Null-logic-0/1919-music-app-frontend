'use client'
import Image from "next/image";
import styles from "./page.module.css";
import AlbumCard from "./Components/AlbumCard/AlbumCard";
import { ImageSizeVariant } from "./enums/imageSizeVariants";

export default function Home() {
  return (
    <main>
      <AlbumCard title={"name"} subtitle={"song"} images={"/images/albumCard.png"} showDetails
      imageSizeVariant={ImageSizeVariant.Large} direction="row"/>

    </main>
  );
}
