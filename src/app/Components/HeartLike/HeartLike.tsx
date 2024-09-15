import { useState } from "react";
import Image from "next/image";
import styles from "./HeartLike.module.scss";
import { HeartLikeEnum } from "../../enums/HeartLike.enums";
import axios from "axios";

interface Props {
  musicId: string;
  isDisabled?: boolean;
}

const HeartLike = ({ musicId, isDisabled }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const getIconSource = () => {
    if (isDisabled) return HeartLikeEnum.Disabled;
    return isClicked ? HeartLikeEnum.Clicked : HeartLikeEnum.Default;
  };

  const handleClick = async () => {
    if (!isDisabled) {
      const accessToken = localStorage.getItem("accesstoken"); 
      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      try {
        await axios.put(
          `https://one919-backend.onrender.com/favorites/addMusic/${musicId}`,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, 
            },
          }
        );
        setIsClicked((prev) => !prev); 
      } catch (error) {
        console.error("Failed to add music to favorites:", error);
      }
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
