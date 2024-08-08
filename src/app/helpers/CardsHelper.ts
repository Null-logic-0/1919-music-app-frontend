import { useState, useEffect } from 'react';

const CardsHelper = () => {
    const [cardsToShow, setCardsToShow] = useState<number>(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visibleCount = 4;

            if (width > 2300) {
                visibleCount = 6;
            } else if (width >= 1500) {
                visibleCount = 4 + Math.max(0, Math.floor((width - 1900) / 100));
                visibleCount = Math.min(visibleCount, 6);
            } else if (width >= 1280) {
                visibleCount = 3;
            } else if (width >= 1075) {
                visibleCount = 2;
            } else if (width >= 1025) {
                visibleCount = 2;
            }else {
                visibleCount = 6; 
            }

            setCardsToShow(visibleCount);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return cardsToShow;
};

export default CardsHelper;
