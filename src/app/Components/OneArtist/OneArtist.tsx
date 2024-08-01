import styles from './OneAtrist.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';
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
    },
    {
        id: 2,
        image: '/Images/D.jpg',
        title: 'title',
        artist: 'Name',
        duration: '4,50',
        plays: '30000',
        album: 'Songs 20',
        key: '2'
    },
    {
        id: 3,
        image: '/Images/indila.jpg',
        title: 'title',
        artist: 'Name',
        duration: '4,50',
        plays: '30000',
        album: 'Songs 20',
        key: '3'
    }
]

const OneAtrist = () => {
   
    return (
        <div className={styles.main}>
            <PagesHeaderTop link='/topartist'/>
            <SingleArtist />
            <div className={styles.table}>
                <TableComponent replaceButton={false} dataSource={data} />                
            </div>


        </div>
    )
}

export default OneAtrist;