import styles from "./page.module.scss";
import TopCharts from "@/app/Components/TopCharts/TopCharts";
import PagesHeaderTop from "@/app/Components/PagesHeaderTop/PagesHeaderTop";

export default function Home() {

  return (
    <main className={styles.main}>
      <PagesHeaderTop link="/" />
      <TopCharts />
    </main>
  )
}
