import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './CardTitle.module.scss';

type TitleProps = {
    title?: string;
    imageSizeVariant: ImageSizeVariant;
    
};

const CardTitle = ({ title, imageSizeVariant }: TitleProps) => {
    const getTitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || 
            imageSizeVariant === ImageSizeVariant.Small || 
            imageSizeVariant === ImageSizeVariant.RoundedXL) {
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

export default CardTitle;
