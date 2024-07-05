import Image from 'next/image';
import Link from 'next/link';
import styles from './AlbumCard.module.scss';
import { ImageSizeVariant, imageSizeVariants } from '../../enums/imageSizeVariants';

type AlbumProps = {
    showDetails?: boolean;
    title: string;
    subtitle: string;
    direction?: 'row' | 'column';
    imageSizeVariant?: ImageSizeVariant;
    images: string;
};

const AlbumCard = ({ showDetails, title, subtitle, direction, imageSizeVariant = ImageSizeVariant.Medium, images }: AlbumProps) => {
    const classNames = [styles.container];
    if (direction === 'row') classNames.push(styles.row);
    else classNames.push(styles.column);

    const classes = [styles.info];
    if (imageSizeVariant === ImageSizeVariant.XLarge || imageSizeVariant === ImageSizeVariant.RoundedXL) {
        classes.push(styles.info); 
    } else if (direction === 'row') {
        classes.push(styles.columnInfo);
    } else if (imageSizeVariant === ImageSizeVariant.RoundedXXL) {
        classes.push(styles.roundedColumn);
    }

    const { width, height } = imageSizeVariants[imageSizeVariant];
    const imageClass = `${styles.image} ${styles[imageSizeVariant]}`;

    const getTitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || imageSizeVariant === ImageSizeVariant.Small || imageSizeVariant === ImageSizeVariant.RoundedXL) {
            return styles.mediumTitle;
        } else if (imageSizeVariant === ImageSizeVariant.Large || imageSizeVariant === ImageSizeVariant.RoundedXXL) {
            return styles.largeTitle;
        }
        return '';
    };

    const getSubtitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || imageSizeVariant === ImageSizeVariant.Small || imageSizeVariant === ImageSizeVariant.RoundedXL) {
            return styles.mediumSubtitle;
        } else if (imageSizeVariant === ImageSizeVariant.Large || imageSizeVariant === ImageSizeVariant.RoundedXXL) {
            return styles.largeSubtitle;
        }
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
