import { useRecoilState } from 'recoil';
import { currentTrackIndexState, playbackStatusState } from '../../../helpers/State';
import { PlaybackStatus } from '../../../enums/player.enums';
import { SongInterface } from '@/app/interfaces/Song.interface';
import ActionsColumn from '../ActionsColumn/ActionsColumn';

type TrackActionsProps = {
  record: SongInterface;
  replaceButton: boolean;
  dataSource: SongInterface[];
};

const TrackActions = ({ record, replaceButton, dataSource }: TrackActionsProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(currentTrackIndexState);
  const [playbackStatus, setPlaybackStatus] = useRecoilState(playbackStatusState);

  const isPlaying = currentTrackIndex !== null && dataSource[currentTrackIndex]?.id === record.id && playbackStatus === PlaybackStatus.PLAYING;

  const onPlayPauseClick = () => {
    const trackIndex = dataSource.findIndex(song => song.id === record.id);

    if (isPlaying) {
      setPlaybackStatus(PlaybackStatus.PAUSED);
    } else {
      if (playbackStatus === PlaybackStatus.PLAYING && currentTrackIndex !== trackIndex) {
        setPlaybackStatus(PlaybackStatus.PAUSED);
      }
      setCurrentTrackIndex(trackIndex);
      setPlaybackStatus(PlaybackStatus.PLAYING);
    }
  };

  return <ActionsColumn record={record} replaceButton={replaceButton} isPlaying={isPlaying} onPlayPauseClick={onPlayPauseClick} />;
};

export default TrackActions;
