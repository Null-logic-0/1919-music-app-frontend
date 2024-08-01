'use client'
import Link from 'next/link';
import styles from './PagesHeaderTop.module.scss';
import Image from 'next/image';
import Logout from '../LogOut/LogOut';


type Props = {
    link?: string;
}
const PagesHeaderTop = ({ link }: Props) => {
    return (
        <div className={styles.container}>
            <Link href={link || '#'} className={styles.link}>
                <Image src={'/icons/chevron-left.svg'} alt='icon' width={32} height={32} />
            </Link>
            <Logout/>

        </div>
    )
}

export default PagesHeaderTop;