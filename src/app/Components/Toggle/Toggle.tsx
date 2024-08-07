import styles from './Toggle.module.scss'
import React, { useState } from 'react';

type Props ={
 text?:string;
 setIsChecked:(value:boolean)=>void;
 isChecked?:boolean;
}

const ToggleSwitch = ({text,setIsChecked,isChecked}:Props) => {
  
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={styles.switchContainer}>
      <div className={styles.switch}>
         <label>
           <input
             type="checkbox"
             checked={isChecked}
             onChange={handleToggle}
           />
           <span className={styles.slider}></span>
         </label>
      </div>
      <span className={styles.labelText}>{text}</span>
    </div>
  );
};

export default ToggleSwitch;