import styles from './Toggle.module.scss'

import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className={styles.slider}></span>
      </label>
      <span className={styles.labelText}>Remember me</span>
    </div>
  );
};

export default ToggleSwitch;