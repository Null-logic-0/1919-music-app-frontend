import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './CardSubtitle.module.scss';

type SubtitleProps = {
    subtitle?: string;
    imageSizeVariant: ImageSizeVariant;
};

const CardSubtitle = ({ subtitle, imageSizeVariant }: SubtitleProps) => {
    const getSubtitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || 
            imageSizeVariant === ImageSizeVariant.Small || 
            imageSizeVariant === ImageSizeVariant.RoundedXL) {
            return styles.mediumSubtitle;
        } else if (imageSizeVariant === ImageSizeVariant.Large || imageSizeVariant === ImageSizeVariant.RoundedXXL) {
            return styles.largeSubtitle;
        } 
        return '';
    };

    const subtitleClass = `${styles.subtitle} ${getSubtitleClass()}`;
    return <span className={subtitleClass}>{subtitle}</span>;
};

export default CardSubtitle;
