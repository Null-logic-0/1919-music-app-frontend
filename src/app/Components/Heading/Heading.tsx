import styles from "./Heading.module.scss";

type HeadingProps = {
  title: string;
};

const Heading = ({ title }: HeadingProps) => {
  return <h2 className={styles.title}>{title}</h2>;
};

export default Heading;
