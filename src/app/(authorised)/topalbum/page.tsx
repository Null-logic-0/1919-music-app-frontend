import styles from "./page.module.scss";
import TopAlbum from "@/app/Components/TopAlbum/TopAlbum";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";



export default function Home() {

  return (
    <main className={styles.main}>     
      <PagesHeaderTop link="/"/>
      <TopAlbum />
    </main>
  )
}
