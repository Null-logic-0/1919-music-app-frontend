import { useRecoilState } from "recoil";
import {
  currentTrackIdState,  
  playbackStatusState,
} from "../../../helpers/State";
import { PlaybackStatus } from "../../../enums/player.enums";
import { SongInterface } from "@/app/interfaces/Song.interface";
import ActionsColumn from "../ActionsColumn/ActionsColumn";

type TrackActionsProps = {
  record: SongInterface;
  replaceButton: boolean;
  dataSource: SongInterface[];
  addMusic: (musicId: string) => void;
  remove: (musicId: string) => void;
  onPlayMusic?: (track: SongInterface) => void;  
  hide:boolean;
};

const TrackActions = ({
  record,
  replaceButton,
  dataSource,
  addMusic,
  remove,
  onPlayMusic, 
  hide
}: TrackActionsProps) => {
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);  
  const [playbackStatus, setPlaybackStatus] = useRecoilState(playbackStatusState);

  const isPlaying = currentTrackId === record.id && playbackStatus === PlaybackStatus.PLAYING;

  const onPlayPauseClick = () => {
    if (isPlaying) {
      setPlaybackStatus(PlaybackStatus.PAUSED);  
    } else {
      setCurrentTrackId(record.id);  
      setPlaybackStatus(PlaybackStatus.PLAYING);  
    }

    if (onPlayMusic) {
      onPlayMusic(record);  
    }
  };

  return (
    <ActionsColumn
      hide={hide}
      record={record}
      replaceButton={replaceButton}
      isPlaying={isPlaying}
      onPlayPauseClick={onPlayPauseClick}
      addMusic={() => addMusic(record.id)}
      remove={() => remove(record.id)}
    />
  );
};

export default TrackActions;
