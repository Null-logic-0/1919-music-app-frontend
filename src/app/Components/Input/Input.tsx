import styles from "./Input.module.scss";


type Props = {
  className?: string;
  disabled?: boolean;
  mode?: "natural" | "Success";
  children?: React.ReactNode;
  text?:string;
};

const Input = ({ className, disabled, children, mode,text}: Props) => {
  const input = [styles.input];
  if (mode === "natural") input.push(styles.natural);
  else if (mode === "Success") input.push(styles.success);
  else if (disabled) input.push(styles.disabled);

  return (
    <div className={`${styles.inputWrapper} ${className || ""}`}>
      <label htmlFor="Email">{text}</label>

      <input
        type="text"
        id="Email"
        className={input.join(" ").trim()}
        disabled={disabled}
      />
      {children}
    </div>
  );
};

export default Input;