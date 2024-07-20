import styles from './AlbumName.module.scss';
type NameProps ={
    name:string;
}
const AlbumName =({name}:NameProps)=>{
    return (
        <span className={styles.name}>
            {name}
        </span>
    )
}

export default AlbumName;