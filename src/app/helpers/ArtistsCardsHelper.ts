import { useState, useEffect } from 'react';

const ArtistsCardsHelper = () => {
    const [cardsToShow, setCardsToShow] = useState<number>(6);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visibleCount = 6;

            if (width > 2300) {
                visibleCount = 10;
            } else if (width >= 2260) {
                visibleCount = 10;
            } else if (width >= 2000) {
                visibleCount = 9;

            } else if (width >= 1900) {
                visibleCount = 8;
            } else if (width >= 1680) {
                visibleCount = 7;
            } else if (width >= 1075) {
                visibleCount = 6;
            } else {
                visibleCount = 6;
            }

            setCardsToShow(visibleCount);
        };

        handleResize(); // Call once on initial render
        window.addEventListener('resize', handleResize); // Add listener for resize events
        return () => window.removeEventListener('resize', handleResize); // Clean up listener
    }, []);

    return cardsToShow;
};

export default ArtistsCardsHelper;
