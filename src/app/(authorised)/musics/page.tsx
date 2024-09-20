import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";
import styles from "./page.module.scss";
import AllMusics from "@/app/Components/AllMusics/AllMusics";

export default function musics() {
  return (
    <div className={styles.main}>
      <PagesHeaderTop link={"/"} />
      <AllMusics />
    </div>
  );
}
