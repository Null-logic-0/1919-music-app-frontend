import styles from "./dropDown.module.scss";
import React, { ReactNode, useState } from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  button: React.ReactNode;
  
}
const Dropdown =({children,button}:Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.drpButton}>
        {button}  
        <Image
          src="/Icons/chevron-down.svg"
          alt="icon"
          width={32}
          height={32}
          />
        
      </div>
      {isOpen && (
        <div className={styles.dropContent}>
          <div className={styles.dropContentWrapper}>      
          {children} 
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
