import React from 'react';
import Image from 'next/image';
import ProgressBar from '../ProgressBar/ProgressBar';
import style from './Controls.module.scss';
import { PlaybackStatus, LoopStatus, ShuffleStatus } from '../../../enums/player.enums';

interface ControlsProps {
    playbackStatus: PlaybackStatus;
    onPlayPause: () => void;
    onPrevious: () => void;
    onNext: () => void;
    loopStatus: LoopStatus;
    onToggleLoop: () => void;
    shuffleStatus: ShuffleStatus;
    onToggleShuffle: () => void;
    currentTime: number;
    duration: number;
    onTimeChange: (newTime: number) => void;
    onDoubleClick: () => void;
}

const Controls = ({
    playbackStatus,
    onPlayPause,
    onPrevious,
    onNext,
    loopStatus,
    onToggleLoop,
    shuffleStatus,
    onToggleShuffle,
    currentTime,
    duration,
    onTimeChange,
    onDoubleClick,
}:ControlsProps) => {
    return (
        <div className={style.container}>
            <div className={style.buttons}>
                <button onClick={onToggleShuffle} className={style.btn}>
                    <Image
                        src={shuffleStatus === ShuffleStatus.ENABLED ? "/Icons/shuffle1.svg" : "/Icons/shuffle.svg"}
                        alt="Shuffle"
                        width={0}
                        height={0}
                        className={style.loop}
                    />
                </button>
                <button onClick={onPrevious} className={style.btn}>
                    <Image
                        src="/Icons/back.svg"
                        alt="Previous"
                        width={0}
                        height={0}
                        className={style.next}
                    />
                </button>
                <button onClick={onPlayPause} className={`${style.btn} ${style.circle}`}>
                    <Image
                        src={playbackStatus === PlaybackStatus.PLAYING ? "/Icons/pause.svg" : "/Icons/Play.svg"}
                        alt={playbackStatus === PlaybackStatus.PLAYING ? "Pause" : "Play"}
                        width={0}
                        height={0}
                        className={style.pause}
                    />
                </button>
                <button onClick={onNext} className={style.btn}>
                    <Image
                        src="/Icons/next.svg"
                        alt="Next"
                        width={0}
                        height={0}
                        className={style.next}
                    />
                </button>
                <button onClick={onToggleLoop} className={style.btn}>
                    <Image
                        src={loopStatus === LoopStatus.ENABLED ? "/Icons/repeat1.svg" : "/Icons/repeat.svg"}
                        alt="Loop"
                        width={0}
                        height={0}
                        className={style.loop}
                    />
                </button>
            </div>
            <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onTimeChange={onTimeChange}
                onDoubleClick={onDoubleClick}
                className={style.progressBarHide}
            />
        </div>
    );
};

export default Controls;
