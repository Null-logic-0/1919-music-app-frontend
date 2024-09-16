import MultiTaskButton from "../../MultiTaskButton/MultiTaskButton";
import { SongInterface } from "@/app/interfaces/Song.interface";
import styles from "./ActionsColumn.module.scss";

type ActionsColumnProps = {
  record: SongInterface;
  replaceButton: boolean;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  remove?: (musicId: number) => void;
  addMusic?: (musicId: number) => void;
  hide: boolean;
};

const ActionsColumn = ({
  record,
  replaceButton,
  isPlaying,
  onPlayPauseClick,
  addMusic,
  remove,
  hide,
}: ActionsColumnProps) => (
  <div className={styles.buttons}>
    <MultiTaskButton
      icon={isPlaying ? "/Icons/toPause.svg" : "/Icons/toPlay.svg"}
      onclick={onPlayPauseClick}
    />
    {hide && (
      <>
        {replaceButton ? (
          remove ? (
            <MultiTaskButton
              icon="/Icons/trash.svg"
              onclick={() => remove(record.id)}
            />
          ) : null
        ) : addMusic ? (
          <MultiTaskButton
            icon="/Icons/plusIcon.png"
            onclick={() => addMusic(record.id)}
          />
        ) : null}
      </>
    )}
  </div>
);

export default ActionsColumn;
