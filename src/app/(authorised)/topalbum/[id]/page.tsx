import OneAlbum from '@/app/Components/OneAlbum/OneAlbum';
import styles from './page.module.scss';
import OneAtrist from '@/app/Components/OneArtist/OneArtist';


const AlbumId = () => {
   
    return (
        <div className={styles.main}>
           <OneAlbum/>
        </div>
    )
}

export default AlbumId