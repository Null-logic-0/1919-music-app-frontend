import styles from './MusicDuration.module.scss';

type musicDurationProps = {
    duration: string;

}

const MusicDuration = ({ duration }: musicDurationProps) => {
    return (
        <span className={styles.text}>
            {duration}
        </span>
    )
}

export default MusicDuration;