/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import styles from './CardImage.module.scss';
import { ImageSizeVariant, imageSizeVariants } from '../../../enums/imageSizeVariants';

type ImageProps = {
    photo: any;
    alt: string;
    imageSizeVariant: ImageSizeVariant;
};

const CardImage = ({ photo, alt, imageSizeVariant }: ImageProps) => {
    const { width, height } = imageSizeVariants[imageSizeVariant];
    const imageClass = `${styles.image} ${styles[imageSizeVariant]}`;

    return (
            <img
                src={photo}
                alt={alt}
                width={width}
                height={height}
                className={imageClass}
            />
    );
};

export default CardImage;
