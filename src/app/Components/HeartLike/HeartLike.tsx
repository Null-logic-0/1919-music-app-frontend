import { useState } from "react";
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
  const [isLiked, setIsLiked] = useState(initialIsLiked); 

  const getIconSource = () => {
    if (isDisabled) return HeartLikeEnum.Disabled;
    return isLiked ? HeartLikeEnum.Clicked : HeartLikeEnum.Default;
  };

  const handleClick = async () => {
    if (isDisabled) return;

    const accessToken = localStorage.getItem("accesstoken");
    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    setIsLiked((prev) => !prev); 

    try {
      if (isLiked) {
        await axios.delete(
          `https://one919-backend.onrender.com/favorites/deleteMusic/${musicId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        await axios.put(
          `https://one919-backend.onrender.com/favorites/addMusic/${musicId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      setIsLiked((prev) => !prev); 
    }
  };

  return (
    <button className={styles.heartLike} onClick={handleClick} disabled={isDisabled}>
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
