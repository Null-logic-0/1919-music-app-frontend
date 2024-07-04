import Image from 'next/image';
import Link from 'next/link';
import styles from './AlbumCard.module.scss';

type AlbumProps = {
    showDetails?: boolean;
    title: string;
    subtitle: string;
    direction?: 'row' | 'column';
    imageSizeVariant?: 'small' | 'medium' | 'large' | 'Xlarge' | 'rounded'| 'roundedXl'|'roundedXxl';
    images: string;
};

const imageSizeVariants = {
    small: { width: 106, height: 106 },
    medium: { width: 292, height: 292 },
    large: { width: 372, height: 217 },
    Xlarge: { width: 372, height: 285 },
    rounded: { width: 176, height: 176 },
    roundedXl: { width: 240, height: 240 },
    roundedXxl: { width: 240, height: 240 },


};

const AlbumCard = ({ showDetails, title, subtitle, direction, imageSizeVariant = 'medium', images }: AlbumProps) => {
    const classNames = [styles.container];
    if (direction === 'row') classNames.push(styles.row);
    else classNames.push(styles.column);

    const classes = [styles.info];
    if (imageSizeVariant == 'Xlarge') classes.push(styles.info)
    else if (direction === 'row') classes.push(styles.columnInfo);
    else if (imageSizeVariant === 'roundedXxl' || 'roundedXl') classes.push(styles.roundedColumn);

    const { width, height } = imageSizeVariants[imageSizeVariant];
    const imageClass = `${styles.image} ${styles[imageSizeVariant]}`;

    const getTitleClass = () => {
        if (imageSizeVariant === 'Xlarge' || imageSizeVariant === 'small' || imageSizeVariant === 'roundedXl') {
            return styles.mediumTitle;
        } else if (imageSizeVariant === 'large' || imageSizeVariant === 'roundedXxl') {
            return styles.largeTitle;
        }
        return '';
    };

    const getSubtitleClass = () => {
        if (imageSizeVariant === 'Xlarge' || imageSizeVariant === 'small'|| imageSizeVariant === 'roundedXl') {
            return styles.mediumSubtitle;
        } else if (imageSizeVariant === 'large' || imageSizeVariant === 'roundedXxl') {
            return styles.largeSubtitle;
        } else
        return '';
    };

    const titleClass = `${styles.title} ${getTitleClass()}`;
    const subtitleClass = `${styles.subtitle} ${getSubtitleClass()}`;

    return (
        <div className={classNames.join(' ').trim()}>
            <Link href="/">
                <Image
                    src={images}
                    alt='Album Cover'
                    width={width}
                    height={height}
                    className={imageClass}
                />
            </Link>

            {showDetails && (
                <div className={classes.join(' ').trim()}>
                    <span className={titleClass}>{title}</span>
                    <span className={subtitleClass}>{subtitle}</span>
                </div>
            )}
        </div>
    );
};

export default AlbumCard;
