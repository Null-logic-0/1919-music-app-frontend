import styles from "./page.module.scss";
import TopArtist from "@/app/Components/TopArtist/TopArtist";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";


export default function Home() {

  return (
    <main className={styles.main}>  
        <PagesHeaderTop link="/"/>
        <TopArtist/>
    
    </main>
  )
}
