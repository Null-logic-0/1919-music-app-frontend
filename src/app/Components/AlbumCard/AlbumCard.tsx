import { useEffect, useState } from 'react';
import styles from './AlbumCard.module.scss';
import AlbumImage from './AlbumImage';
import AlbumTitle from './AlbumTitle';
import AlbumSubtitle from './AlbumSubtitle';
import { ImageSizeVariant } from '../../enums/imageSizeVariants';
import Link from 'next/link';

type AlbumProps = {
    showDetails?: boolean;
    title?: string;
    subtitle?: string;
    direction?: 'row' | 'column';
    imageSizeVariant?: ImageSizeVariant;
    images: string;
    link?: string;
};

const AlbumCard = ({
    showDetails,
    title,
    subtitle,
    direction,
    imageSizeVariant = ImageSizeVariant.Medium,
    images,
    link, 
}: AlbumProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const classNames = [styles.container];
    if (direction === 'row') classNames.push(styles.row);
    else classNames.push(styles.column);

    const classes = [styles.info];
    if (imageSizeVariant === ImageSizeVariant.XLarge) {
        classes.push(styles.info);
    } else if (direction === 'row') {
        classes.push(styles.columnInfo);
    } else if (
        imageSizeVariant === ImageSizeVariant.RoundedXXL ||
        imageSizeVariant === ImageSizeVariant.RoundedXL
    ) {
        classes.push(styles.roundedColumn);
    }

    return (
        <div className={classNames.join(' ').trim()}>
            {link ? (
                <Link href={link || '#'}>
                    <AlbumImage src={images} alt="Album Cover" imageSizeVariant={imageSizeVariant} />
                </Link>
            ) : (
                <AlbumImage src={images} alt="Album Cover" imageSizeVariant={imageSizeVariant} />
            )}

            {showDetails && (
                <div className={`${classes.join(' ').trim()} `}>
                    {title && <AlbumTitle title={title} imageSizeVariant={imageSizeVariant} />}
                    {subtitle && <AlbumSubtitle subtitle={subtitle} imageSizeVariant={imageSizeVariant} />}
                </div>
            )}
        </div>
    );
};

export default AlbumCard;
