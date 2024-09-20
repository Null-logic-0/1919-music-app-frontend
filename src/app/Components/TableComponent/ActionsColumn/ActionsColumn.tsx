import MultiTaskButton from "../../MultiTaskButton/MultiTaskButton";
import { SongInterface } from "@/app/interfaces/Song.interface";
import styles from "./ActionsColumn.module.scss";
import HeartLike from "../../HeartLike/HeartLike";

type ActionsColumnProps = {
  record: SongInterface;
  replaceButton: boolean;
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  remove?: (musicId: number) => void;
  addMusic?: (musicId: number) => void;
  hide: boolean;
  like?:boolean;
  musicId?: string;
};

const ActionsColumn = ({
  record,
  replaceButton,
  isPlaying,
  onPlayPauseClick,
  addMusic,
  remove,
  hide,
  like,
  musicId
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
    {
      like && (
        <HeartLike musicId={musicId ||'#'}/>
      )
    }
  </div>
);

export default ActionsColumn;
