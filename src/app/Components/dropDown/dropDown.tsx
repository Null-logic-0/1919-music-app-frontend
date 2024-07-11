import styles from "./dropDown.module.scss";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Dropdown = ({children}:Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.drpButton}>
        Week
        <Image
          src={"/icons/chevron-down.svg"}
          alt="icon"
          width={32}
          height={32}
        />
      </button>
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
