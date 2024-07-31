'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TopCharts from "@/app/Components/TopCharts/TopCharts";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";

export default function Home() {

  return (
    <main>
      <PagesHeaderTop link="/" />
      <TopCharts />
    </main>
  )
}
