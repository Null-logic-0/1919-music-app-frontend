import Image from 'next/image';
import Link from 'next/link';
import styles from './AlbumCard.module.scss';
import { ImageSizeVariant, imageSizeVariants } from '../../enums/imageSizeVariants';

type ImageProps = {
    src: string;
    alt: string;
    imageSizeVariant: ImageSizeVariant;
};

const AlbumImage = ({ src, alt, imageSizeVariant }: ImageProps) => {
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

export default AlbumImage;
