import Image from 'next/image';
import styles from './Playlist.module.scss';
import Link from 'next/link';


type playListProps = {
    image: string;
    name: string;
    link:string;
    song:string;

}

const Playlist = ({ image, name,link,song }: playListProps) => {
    return (
        <div className={styles.main}>
            <Link href={link}>
                <Image src={image} width={64} height={64} alt='album-cover' />
            </Link>

            <div className={styles.container}>
                <span className={styles.name}>{name}</span>
                <span className={styles.song}>{song}</span>
            </div>
        </div>
    )
}

export default Playlist;