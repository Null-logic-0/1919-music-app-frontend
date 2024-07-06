import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './AlbumCard.module.scss';

type TitleProps = {
    title?: string;
    imageSizeVariant: ImageSizeVariant;
};

const AlbumTitle = ({ title, imageSizeVariant }: TitleProps) => {
    const getTitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || 
            imageSizeVariant === ImageSizeVariant.Small || 
            imageSizeVariant === ImageSizeVariant.RoundedXL || 
            imageSizeVariant === ImageSizeVariant.Player) {
            return styles.mediumTitle;
        } else if (imageSizeVariant === ImageSizeVariant.Large ||
            imageSizeVariant === ImageSizeVariant.RoundedXXL) {
            return styles.largeTitle;
        }
        return '';
    };

    const titleClass = `${styles.title} ${getTitleClass()}`;
    return <span className={titleClass}>{title}</span>;
};

export default AlbumTitle;
