'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TopCarts from "@/app/Components/TopCarts/TopCarts";


export default function Home() {

  return (
    <main>      
        <TopCarts/>
    </main>
  )
}
