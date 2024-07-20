import styles from './MusicPlayerCounter.module.scss';

type CounterProps = {
    text:string;
}

const MusicPlayerCounter =({text}:CounterProps)=>{
    return(
        <span className={styles.text}>
            {text}
        </span>
    )
}

export default MusicPlayerCounter;