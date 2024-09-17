/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import styles from "./Playlist.module.scss";
import Link from "next/link";
import MultiTaskButton from "../../MultiTaskButton/MultiTaskButton";

type playListProps = {
  image: any;
  name: string;
  link: string;
  count: any;
  id?:number;
  remove?:(id:any)=>void;
};

const Playlist = ({ image, name, link, count,remove ,id}: playListProps) => {
  return (
    <div className={styles.main}>
      <Link href={link}>
        <img src={image} width={64} height={64} alt="album-cover" />
      </Link>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <span className={styles.name}>{name}</span>
          <span className={styles.song}>{count}</span>
        </div>
        <MultiTaskButton icon="/Icons/trash.svg" onclick={() => remove?.(id)}/>
      </div>
    </div>
  );
};

export default Playlist;
