import MultiTaskButton from '../../MultiTaskButton/MultiTaskButton';
import { SongInterface } from '@/app/interfaces/Song.interface';
import styles from './ActionsColumn.module.scss'

type ActionsColumnProps = {
  record: SongInterface;
  replaceButton: boolean;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
};

const ActionsColumn = ({ record, replaceButton, isPlaying, onPlayPauseClick }: ActionsColumnProps) => (
  <div className={styles.buttons}>
    <MultiTaskButton icon={isPlaying ? '/icons/toPause.svg' : '/icons/toPlay.svg'} onclick={onPlayPauseClick} />
    {replaceButton ? <MultiTaskButton icon="/icons/trash.svg" /> : <MultiTaskButton icon="/icons/plusIcon.png" />}
  </div>
);

export default ActionsColumn;
