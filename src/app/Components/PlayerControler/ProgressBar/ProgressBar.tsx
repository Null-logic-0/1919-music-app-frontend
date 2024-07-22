import React, { useEffect, useRef } from 'react';
import styles from './ProgressBar.module.scss';

interface Props {
    currentTime: number;
    duration: number;
    onTimeChange: (newTime: number) => void;
    onDoubleClick: () => void;
    className?: string;
}

const ProgressBar = ({ currentTime, duration, onTimeChange, onDoubleClick, className }: Props) => {
    const progressBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const percentage = (currentTime / duration) * 100;
        if (progressBarRef.current) {
            progressBarRef.current.style.setProperty('--seek-before-width', `${percentage}%`);
            if (percentage === 100) {
                progressBarRef.current.style.setProperty('--knobby', 'var(--finishedKnobby)');
            } else {
                progressBarRef.current.style.setProperty('--knobby', 'var(--selectedKnobby)');
            }
        }
    }, [currentTime, duration]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        onTimeChange(newTime);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`${styles.time} ${className}`}>
            <span className={styles.timing}>{formatTime(currentTime)}</span>
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleTimeChange}
                onDoubleClick={onDoubleClick}
                aria-label="Seek"
                ref={progressBarRef}
                className={styles.progressBar}
            />
            <span className={styles.timing}>{formatTime(duration)}</span>
        </div>
    );
};

export default ProgressBar;
