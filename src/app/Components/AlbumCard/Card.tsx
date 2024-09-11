import { useEffect, useState } from 'react';
import styles from './Card.module.scss';
import CardImage from './CardImage/CardImage';
import { ImageSizeVariant } from '../../enums/imageSizeVariants';
import Link from 'next/link';
import CardTitle from './CardTitle/CardTitle';
import CardSubtitle from './CardSubtitle/CardSubtitle';

type CardProps = {
    showDetails?: boolean;
    title?: string;
    subtitle?: string;
    direction?: 'row' | 'column';
    imageSizeVariant?: ImageSizeVariant;
    photo: any; 
    link?: string;
};

const Card = ({
    showDetails,
    title,
    subtitle,
    direction,  
    imageSizeVariant = ImageSizeVariant.Medium,
    photo,
    link,  
}: CardProps) => {
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
        imageSizeVariant === ImageSizeVariant.RoundedXL) {
        classes.push(styles.roundedColumn);
    }

    return (
        <div className={classNames.join(' ').trim()}>
            {link ? (
                <Link href={link}>
                    <CardImage photo={photo} alt="Album Cover" imageSizeVariant={imageSizeVariant} />
                </Link>
            ) : (
                <CardImage photo={photo} alt="Album Cover" imageSizeVariant={imageSizeVariant} />
            )}

            {showDetails && (
                <div className={`${classes.join(' ').trim()} `}>
                    {title && <CardTitle title={title} imageSizeVariant={imageSizeVariant} />}
                    {subtitle && <CardSubtitle subtitle={subtitle} imageSizeVariant={imageSizeVariant} />}
                </div>
            )}
        </div>
    );
};

export default Card;
