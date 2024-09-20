import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./HeartLike.module.scss";
import { HeartLikeEnum } from "../../enums/HeartLike.enums";
import axios from "axios";

interface Props {
  musicId: string;
  isDisabled?: boolean;
  initialIsLiked?: boolean;
}

const HeartLike = ({ musicId, isDisabled, initialIsLiked = false }: Props) => {
  const [isLiked, setIsLiked] = useState(() => {
    const savedLikeStatus = localStorage.getItem(`liked-${musicId}`);
    return savedLikeStatus === "true" || initialIsLiked;
  });

  const getIconSource = () => {
    if (isDisabled) return HeartLikeEnum.Disabled;
    return isLiked ? HeartLikeEnum.Clicked : HeartLikeEnum.Default;
  };

  const handleClick = async () => {
    if (isDisabled) return;

    const accessToken = localStorage.getItem("accesstoken");
    if (!accessToken) {
      return;
    }

    setIsLiked((prev) => {
      const newLikedStatus = !prev;
      localStorage.setItem(`liked-${musicId}`, newLikedStatus.toString());
      return newLikedStatus;
    });

    try {
      if (isLiked) {
        await axios.delete(
          `https://one919-backend-1.onrender.com/favorites/deleteMusic/${musicId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        await axios.put(
          `https://one919-backend-1.onrender.com/favorites/addMusic/${musicId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
    } catch (error) {
      setIsLiked((prev) => !prev);
    }
  };

  useEffect(() => {
  }, [musicId]);

  return (
    <button
      className={styles.heartLike}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <Image
        src={getIconSource()}
        alt="Heart Icon"
        width={32}
        height={32}
        className={styles.icon}
      />
    </button>
  );
};

export default HeartLike;
