'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TopCarts from "@/app/Components/TopCharts/TopCarts";


export default function Home() {

  return (
    <main>      
        <TopCarts/>
    </main>
  )
}
