'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TopHits from "@/app/Components/TopHits/TopHits";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";



export default function Home() {

  return (
    <main> 
      <PagesHeaderTop link="/"/>  
      <TopHits />
    </main>
  )
}
