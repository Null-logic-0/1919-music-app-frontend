import React, { useState } from 'react';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import styles from './MultiCardCarousel.module.scss';

type CardProps = {
    image: string;
};

type MultiCardCarouselProps = {
    cards: CardProps[];
    renderCard: (card: CardProps, index: number) => React.ReactNode;
    visibleCardsCount?: number;
};

const MultiCardCarousel = ({ cards, renderCard, visibleCardsCount = 4 }: MultiCardCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + visibleCardsCount) % cards.length
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - visibleCardsCount + cards.length) % cards.length
        );
    };

    const getDisplayedCards = () => {
        if (cards.length <= visibleCardsCount) {
            return cards;
        }

        if (currentIndex + visibleCardsCount <= cards.length) {
            return cards.slice(currentIndex, currentIndex + visibleCardsCount);
        } else {
            return cards.slice(currentIndex).concat(cards.slice(0, currentIndex + visibleCardsCount - cards.length));
        }
    };

    const displayedCards = getDisplayedCards();
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.button}>
                    <MultiTaskButton onclick={handlePrev} icon='/icons/arrow-left.svg' />
                </div>
                <div className={styles.cards}>
                    {displayedCards.map(renderCard)}
                </div>

                <div className={styles.button}>
                    <MultiTaskButton onclick={handleNext} icon='/icons/arrow-right.svg' />
                </div>
            </div>
        </div>
    );
};

export default MultiCardCarousel;
