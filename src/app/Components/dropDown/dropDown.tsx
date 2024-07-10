import styles from "./dropDown.module.scss";
import React, { useState } from "react";
import Image from "next/image";

function Dropdown() {
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
          {/* <p>Option A</p>
          <p>Option B</p>
          <p>Option C</p> */}
          <div className={styles.dropContentWrapper}>      
            <label  className={styles.lableWrapper}>
              <input type="radio" name="Day" id="1" className={styles.radioStyler}/>
              <span className={styles.span}>Day</span>
            </label>     
            <label  className={styles.lableWrapper}>
              <input type="radio" name="Day" id="1" className={styles.radioStyler} />
              <span className={styles.span}>Week</span>
            </label>
            <label  className={styles.lableWrapper}>
              <input type="radio" name="Day" id="1" className={styles.radioStyler} />
              <span className={styles.span}>Month</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
