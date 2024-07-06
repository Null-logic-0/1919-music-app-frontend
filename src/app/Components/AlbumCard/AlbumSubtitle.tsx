import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './AlbumCard.module.scss';

type SubtitleProps = {
    subtitle?: string;
    imageSizeVariant: ImageSizeVariant;
};

const AlbumSubtitle = ({ subtitle, imageSizeVariant }: SubtitleProps) => {
    const getSubtitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || 
            imageSizeVariant === ImageSizeVariant.Small || 
            imageSizeVariant === ImageSizeVariant.RoundedXL || 
            imageSizeVariant === ImageSizeVariant.Player) {
            return styles.mediumSubtitle;
        } else if (imageSizeVariant === ImageSizeVariant.Large || imageSizeVariant === ImageSizeVariant.RoundedXXL) {
            return styles.largeSubtitle;
        } 
        return '';
    };

    const subtitleClass = `${styles.subtitle} ${getSubtitleClass()}`;
    return <span className={subtitleClass}>{subtitle}</span>;
};

export default AlbumSubtitle;
