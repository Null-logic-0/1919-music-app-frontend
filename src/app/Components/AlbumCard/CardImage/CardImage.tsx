import Image from 'next/image';
import Link from 'next/link';
import styles from './CardImage.module.scss';
import { ImageSizeVariant, imageSizeVariants } from '../../../enums/imageSizeVariants';

type ImageProps = {
    src: string;
    alt: string;
    imageSizeVariant: ImageSizeVariant;
};

const CardImage = ({ src, alt, imageSizeVariant }: ImageProps) => {
    const { width, height } = imageSizeVariants[imageSizeVariant];
    const imageClass = `${styles.image} ${styles[imageSizeVariant]}`;

    return (
        <Link href="/">
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={imageClass}
            />
        </Link>
    );
};

export default CardImage;