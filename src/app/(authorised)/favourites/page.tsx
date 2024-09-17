import Favourites from "@/app/Components/Favourites/Favourites";
import styles from "./page.module.scss";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";

const FavouritesPage = () => {
  return (
    <div className={styles.main}>
      <PagesHeaderTop link={"/"} />

      <Favourites />
    </div>
  );
};

export default FavouritesPage;
