import { atom } from 'recoil';
import { PlaybackStatus, LoopStatus, ShuffleStatus } from '../enums/player.enums';
import { Track } from '../interfaces/Track.interface';

export const playbackStatusState = atom<PlaybackStatus>({
    key: 'playbackStatusState',
    default: PlaybackStatus.PAUSED,
});

export const volumeState = atom<number>({
    key: 'volumeState',
    default: 50,
});

export const loopStatusState = atom<LoopStatus>({
    key: 'loopStatusState',
    default: LoopStatus.DISABLED,
});

export const shuffleStatusState = atom<ShuffleStatus>({
    key: 'shuffleStatusState',
    default: ShuffleStatus.DISABLED,
});

export const currentTimeState = atom<number>({
    key: 'currentTimeState',
    default: 0,
});

export const durationState = atom<number>({
    key: 'durationState',
    default: 0,
});

export const currentTrackIndexState = atom<number>({
    key: 'currentTrackIndexState',
    default: 0,
});

export const currentTrackState = atom<string | null>({
    key:"currentTrackIdState",
    default:null,
});

export const musicTracksState = atom<Track[]>({
    key: 'musicTracksState',
    default: [], 
});

export const currentTrackIdState = atom<string | null>({
    key: 'currentTrackIdState',
    default: null,
});