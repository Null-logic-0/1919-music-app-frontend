import Image from "next/image";
import styles from "./page.module.scss";
import OneHit from "@/app/Components/OneHit/OneHit";


export default function Home() {

  return (
    <main className={styles.main}>
        <OneHit />
    </main>
  )
}
