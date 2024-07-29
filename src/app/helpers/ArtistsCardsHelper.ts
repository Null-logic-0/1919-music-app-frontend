import { useState, useEffect } from 'react';

const ArtistsCardsHelper = () => {
    const [cardsToShow, setCardsToShow] = useState<number>(6);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visibleCount = 6;

            if (width > 2300) {
                visibleCount = 10;
            } else if (width >= 1500) {
                visibleCount = 6 + Math.max(0, Math.floor((width - 1900) / 100));
                visibleCount = Math.min(visibleCount, 10);
            } else if (width >= 1280) {
                visibleCount = 4;
            } else if (width >= 1075) {
                visibleCount = 3;
            } else if (width >= 1025) {
                visibleCount = 3;
            } else {
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

export default ArtistsCardsHelper;
