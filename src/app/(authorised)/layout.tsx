import { ReactNode } from 'react';
import styles from './layout.module.css';
import PlayerController from '../Components/PlayerControler/PlayerControler';
import ResponsiveMenu from '../Components/NavMenu/ResponsiveMenu/ResponsiveMenu';
import HeaderTop from '../Components/HeaderLogo/HeaderTop';
import NavMenu from '../Components/NavMenu/NavMenu';

type Props = {
    children: ReactNode

}

const AuthLayout = (props: Props) => {
    return (
        <div className={styles.main}>
            <HeaderTop />
            <div className={styles.container}>
                <div className={styles.navMenu}>
                    <NavMenu />
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
            <div className={styles.controls}>
                <PlayerController />
                <ResponsiveMenu />
            </div>
        </div>
    )
}

export default AuthLayout;