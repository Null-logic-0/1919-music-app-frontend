import Playlists from "@/app/Components/Playlists/Playlists";
import styles from "./page.module.scss";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";

export default function CreatedPlaylists() {
  return (
    <div className={styles.main}>
      <PagesHeaderTop link={"/"} />

      <Playlists />
    </div>
  );
}
