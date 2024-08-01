import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import styles from './page.module.scss';
import SingleArtist from '@/app/Components/SingleArtist/SingleArtist';
import TableComponent from '@/app/Components/TableComponent/TableComponent';
import { SongInterface } from '@/app/interfaces/Song.interface';
import OneAtrist from '@/app/Components/OneArtist/OneArtist';


const ArtistId = () => {
   
    return (
        <div className={styles.main}>
           <OneAtrist/>


        </div>
    )
}

export default ArtistId