import { useState } from "react";
import HideButton from "./HideButton/HideButton";
import styles from "./Input.module.scss";

type Props = {
  disabled?: boolean;
  type?: "text" | "email" | "password";
  mode?: "natural" | "Success" | "Error";
  text?: string;
  showHideButton?: boolean;
}

const Input = ({type = "text", mode, text, showHideButton}: Props) => {
  const input = [styles.input];

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (mode === "natural") input.push(styles.natural);
  if (mode === "Success") input.push(styles.success);
  if (mode === "Error") input.push(styles.error);

  return (
    <div className={styles.inputWrapper}>
     
    <label className={styles.label}>{text}</label>

      <div className={styles.container}>
        <input
          id="input"
          type={type === "password" && showPassword ? 'text' : type}
          className={input.join(' ')}
          onChange={type === "password" ? handlePasswordChange : undefined}
          value={type === "password" ? password : undefined}
        />

          {type === "password" && showHideButton && (
          <HideButton
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        )}
      </div>
      
    </div>
  );
};

export default Input;
