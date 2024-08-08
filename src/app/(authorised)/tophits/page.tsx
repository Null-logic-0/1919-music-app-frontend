'use client'
import styles from "./page.module.scss";
import TopHits from "@/app/Components/TopHits/TopHits";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";



export default function Home() {

  return (
    <main className={styles.main}> 
      <PagesHeaderTop link="/"/>  
      <TopHits />
    </main>
  )
}
