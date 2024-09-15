import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import Card from '../../AlbumCard/Card';
import MusicPlayerCounter from '../../MusicPlayerCounter/MusicPlayerCounter';
import AlbumName from '../../AlbumName/AlbumName';
import MusicDuration from '../../MusicDuration/MusicDuration';
import { SongInterface } from '@/app/interfaces/Song.interface';
import styles from './TableItem.module.scss';


export const renderTitleColumn = (record: SongInterface) => (
  <Card
    name={record.name}
    authorName={record.authorName}
    showDetails
    imageSizeVariant={ImageSizeVariant.Small}
    direction="row"
    images={record.photo}
  />
);

export const renderPlaysColumn = (text: string) => (
  <div className={styles.description}>
    <MusicPlayerCounter text={text} />
  </div>
);

export const renderAlbumColumn = (text: string) => (
  <div className={styles.description}>
    <AlbumName name={text} />
  </div>
);

export const renderDurationColumn = (text: string) => (
  <div className={styles.description}>
    <MusicDuration duration={text} />
  </div>
);
