import { SongInterface } from '@/app/interfaces/Song.interface';
import TableComponent from '../../TableComponent/TableComponent';
import styles from './Recomended.module.scss';


const  musics:SongInterface[] = [
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
const Recomended =()=>{
    return (
        <div className={styles.main}>
            <p className={styles.text}>Recommended</p>
            <TableComponent replaceButton={false} dataSource={musics} showThead={false}/>

        </div>
    )
}

export default Recomended;