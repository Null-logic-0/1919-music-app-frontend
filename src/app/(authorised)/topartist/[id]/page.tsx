import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
import styles from './page.module.scss';
import SingleArtist from '@/app/Components/SingleArtist/SingleArtist';
import TableComponent from '@/app/Components/TableComponent/TableComponent';
import { SongInterface } from '@/app/interfaces/Song.interface';

const data: SongInterface[] = [
    {
        id: 1,
        image: '/Images/DesirelessCover.jpg',
        title: 'title',
        artist: 'Name',
        duration: '4,50',
        plays: '30000',
        album: 'Songs 20',
        key: '1'
    }
]

const ArtistId = () => {
   
    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/topartist'/>
            <SingleArtist />
            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={data} edit/>                
            </div>


        </div>
    )
}

export default ArtistId