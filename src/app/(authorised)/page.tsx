import Artist from "@/app/Components/Artists/Artist";
import styles from "./page.module.css";
import Albums from "@/app/Components/Albums/Albums";
import TopSongs from "@/app/Components/TopSongs/TopSongs";
import Charts from "@/app/Components/Charts/Charts";
import Hits from "@/app/Components/Hits/Hits";
import HomePageTop from "@/app/Components/HomePageTop/HomePageTop";


export default function Home() {
 
  return (
    <main>
      <HomePageTop/>
      <Artist/>
      <Albums/>
      <TopSongs/>
      <Charts/>
      <Hits/>
    </main>
  );
}
