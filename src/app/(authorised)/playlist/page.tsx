import Playlists from '@/app/Components/Playlists/Playlists';
import styles from './page.module.scss';
import PagesHeaderTop from '@/app/Components/PagesHeaderTop/PagesHeaderTop';

const PlaylistPage = () => {
    return (
        <div className={styles.main}>
            <PagesHeaderTop link={'/'} />

            <Playlists />


        </div>
    )
}

export default PlaylistPage;