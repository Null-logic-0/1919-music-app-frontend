import { ImageSizeVariant } from '@/app/enums/imageSizeVariants';
import styles from './CardTitle.module.scss';

type TitleProps = {
    name?: string;
    imageSizeVariant: ImageSizeVariant;
    
};

const CardTitle = ({ name, imageSizeVariant }: TitleProps) => {
    const getTitleClass = () => {
        if (imageSizeVariant === ImageSizeVariant.XLarge || 
            imageSizeVariant === ImageSizeVariant.Small || 
            imageSizeVariant === ImageSizeVariant.RoundedXL|| 
            imageSizeVariant === ImageSizeVariant.Absolute) {
            return styles.mediumTitle;
        } else if (imageSizeVariant === ImageSizeVariant.Large ||
            imageSizeVariant === ImageSizeVariant.RoundedXXL) {
            return styles.largeTitle;
        }
        return '';
    };

    const titleClass = `${styles.title} ${getTitleClass()}`;
    return <span className={titleClass}>{name}</span>;
};

export default CardTitle;
