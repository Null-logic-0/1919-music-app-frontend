import { useState } from 'react';
import Image from 'next/image';
import styles from './HeartLike.module.scss';
import { HeartLikeEnum } from '../../enums/heartLike.enums';
import React from 'react';


interface Props {
  isDisabled?: boolean;
  onClick?: () => void;
}

const HeartLike = ({ isDisabled, onClick }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const getIconSource = () => {
    if (isDisabled) return HeartLikeEnum.Disabled;
    return isClicked ? HeartLikeEnum.Clicked : HeartLikeEnum.Default;
  };

  const handleClick = () => {
    if (!isDisabled) {
      setIsClicked((prev) => !prev);
      onClick?.();
    }
  };

  return (
    <button className={styles.heartLike} onClick={handleClick} disabled={isDisabled}>
      <Image src={getIconSource()} alt="Heart Icon"  width={0}  height={0} className={styles.icon}/>
    </button>
  );
};

export default HeartLike;
