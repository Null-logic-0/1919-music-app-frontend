import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./CardSubtitle.module.scss";

type SubtitleProps = {
  authorName?: string;
  count?: string;
  imageSizeVariant: ImageSizeVariant;
};

const CardSubtitle = ({
  authorName,
  imageSizeVariant,
  count,
}: SubtitleProps) => {
  const getSubtitleClass = () => {
    if (
      imageSizeVariant === ImageSizeVariant.XLarge ||
      imageSizeVariant === ImageSizeVariant.Small ||
      imageSizeVariant === ImageSizeVariant.RoundedXL ||
      imageSizeVariant === ImageSizeVariant.Absolute
    ) {
      return styles.mediumSubtitle;
    } else if (
      imageSizeVariant === ImageSizeVariant.Large ||
      imageSizeVariant === ImageSizeVariant.RoundedXXL
    ) {
      return styles.largeSubtitle;
    }
    return "";
  };

  const subtitleClass = `${styles.subtitle} ${getSubtitleClass()}`;

  return (
    <>
      {count ? (
        <span className={subtitleClass}>{count}</span>
      ) : (
        authorName && <span className={subtitleClass}>{authorName}</span>
      )}
    </>
  );
};

export default CardSubtitle;
