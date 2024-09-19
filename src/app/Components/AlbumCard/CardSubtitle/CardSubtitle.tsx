import { useState } from "react";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import styles from "./CardSubtitle.module.scss";

type SubtitleProps = {
  authorName?: string;
  count?: string;
  imageSizeVariant: ImageSizeVariant;
  biography?: string;
};

const CardSubtitle = ({
  authorName,
  imageSizeVariant,
  count,
  biography,
}: SubtitleProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxBiographyLength = 50; 
  const toggleBiography = () => {
    setIsExpanded((prev) => !prev);
  };

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
    } else if (
      imageSizeVariant === ImageSizeVariant.extraSmall)
      
    return styles.largeSubtitle;
  };

  const subtitleClass = `${styles.subtitle} ${getSubtitleClass()}`;

  const renderBiography = () => {
    if (!biography) return null;

    const trimmedBiography = biography.length > maxBiographyLength
      ? biography.substring(0, maxBiographyLength) + "..."
      : biography;

    return (
      <span className={styles.bio}>
        {isExpanded ? biography : trimmedBiography}
        {biography.length > maxBiographyLength && (
          <button onClick={toggleBiography} className={styles.trimerButton}>
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      </span>
    );
  };

  return (
    <>
      {count ? (
        <span className={subtitleClass}>{count}</span>
      ) : authorName ? (
        <span className={subtitleClass}>{authorName}</span>
      ) : (
        renderBiography()
      )}
    </>
  );
};

export default CardSubtitle;
