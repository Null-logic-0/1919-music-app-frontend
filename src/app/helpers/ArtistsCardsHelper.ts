import { useState, useEffect } from 'react';

const ArtistsCardsHelper = () => {
    const [cardsToShow, setCardsToShow] = useState<number>(10);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visibleCount = 10;

            if (width > 2300) {
                visibleCount = 10;
            } else if (width >= 2260) {
                visibleCount = 9;
            } else if (width >= 2000) {
                visibleCount = 8;

            } else if (width >= 1900) {
                visibleCount = 7;
            } else if (width >= 1619  || width == 1500) {
                visibleCount = 6;
            } else if (width >= 1075) {
                visibleCount = 6;
            } else {
                visibleCount = 10;
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
