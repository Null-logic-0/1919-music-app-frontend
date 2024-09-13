import { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import CardImage from "./CardImage/CardImage";
import { ImageSizeVariant } from "../../enums/imageSizeVariants";
import Link from "next/link";
import CardTitle from "./CardTitle/CardTitle";
import CardSubtitle from "./CardSubtitle/CardSubtitle";
import MultiTaskButton from "../MultiTaskButton/MultiTaskButton";

type CardProps = {
  showDetails?: boolean;
  name?: string;
  title?: string;
  count?: number; 
  listens?:any;
  authorName?: string; 
  direction?: "row" | "column";
  imageSizeVariant?: ImageSizeVariant;
  images: string;
  link?: string;
  id?: any; 
  remove?: (id: number) => void; 
};

const Card = ({
  showDetails,
  name,
  authorName,
  direction,
  imageSizeVariant = ImageSizeVariant.Medium,
  images,
  link,
  count,
  remove,
  id
}: CardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const classNames = [styles.container];
  if (direction === "row") classNames.push(styles.row);
  else classNames.push(styles.column);

  const classes = [styles.info];
  if (imageSizeVariant === ImageSizeVariant.XLarge) {
    classes.push(styles.info);
  } else if (direction === "row") {
    classes.push(styles.columnInfo);
  } else if (
    imageSizeVariant === ImageSizeVariant.RoundedXXL ||
    imageSizeVariant === ImageSizeVariant.RoundedXL
  ) {
    classes.push(styles.roundedColumn);
  }

  return (
    <div className={classNames.join(" ").trim()}>
      {link ? (
        <Link href={link}>
          <CardImage
            src={images}
            alt="Album Cover"
            imageSizeVariant={imageSizeVariant}
          />
        </Link>
      ) : (
        <CardImage
          src={images}
          alt="Album Cover"
          imageSizeVariant={imageSizeVariant}
        />
      )}

      {showDetails && (
        <div className={styles.remove}>
          <div className={`${classes.join(" ").trim()} `}>
            {name && (
              <CardTitle name={name} imageSizeVariant={imageSizeVariant} />
            )}
            {authorName && (
              <CardSubtitle
                authorName={authorName}
                imageSizeVariant={imageSizeVariant}
              />
            )}
            {count && (
              <CardSubtitle
                count={`${count} songs`}
                imageSizeVariant={imageSizeVariant}
              />
            )}
          </div>
          {
            remove && (
                <MultiTaskButton icon={"/Icons/trash.svg"} onclick={() => remove?.(id)} />
            )
          }
        </div>
      )}
    </div>
  );
};

export default Card;
