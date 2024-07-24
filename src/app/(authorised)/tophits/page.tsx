'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TopHits from "@/app/Components/TopHits/TopHits";



export default function Home() {

  return (
    <main>      
      <TopHits />
    </main>
  )
}
