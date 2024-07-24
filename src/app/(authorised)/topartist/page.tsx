'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import TopArtist from "@/app/Components/TopArtist/TopArtist";


export default function Home() {

  return (
    <main>     
        <TopArtist/>
    </main>
  )
}
