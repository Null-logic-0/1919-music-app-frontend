'use client'
import SinglePlaylist from '@/app/Components/SinglePlaylist/SinglePlaylist';
import styles from './page.module.scss';



const PlaylistId = ()=>{
    return (
        <div className={styles.main}>
            <SinglePlaylist/>
        </div>
    )
}

export default PlaylistId;