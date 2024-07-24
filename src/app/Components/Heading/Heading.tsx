import Link from 'next/link';
import styles from './Heading.module.scss';

type HeadingProps = {
    title: string;
    link?: string;
}

const Heading = ({ title, link }: HeadingProps) => {
    return (
        <Link href={link || '#'}>
            <h2 className={styles.title}>{title}</h2>
        </Link>
    )
}

export default Heading;