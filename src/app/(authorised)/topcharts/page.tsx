'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TopCharts from "@/app/Components/TopCharts/TopCharts";


export default function Home() {

  return (
    <main>      
       <TopCharts />
    </main>
  )
}
