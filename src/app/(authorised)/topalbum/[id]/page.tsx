import Image from "next/image";
import styles from "./page.module.scss";
import OneAlbum from "@/app/Components/OneAlbum/OneAlbum";


export default function Home() {

  return (
    <main className={styles.main}>
        <OneAlbum />
    </main>
  )
}
