'use client'
import Image from "next/image";
import styles from "./page.module.scss";
import TopArtist from "@/app/Components/TopArtist/TopArtist";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";


export default function Home() {

  return (
    <main>  
        <PagesHeaderTop link="/"/>
        <TopArtist/>
    
    </main>
  )
}
