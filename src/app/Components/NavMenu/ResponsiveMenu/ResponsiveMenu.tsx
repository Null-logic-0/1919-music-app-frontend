'use client'
import NavItem from "../NavItem/NavItem";
import styles from './ResponsiveMenu.module.scss';



const ResponsiveMenu = () => {
    const links = [
        { key: 'home', href: "/", text: "Home",activeIcon: '/icons/home-active.svg', iconSrc:'/icons/home.svg'},
        { key: 'Playlists', href: "/playlist", text: "Playlists",activeIcon:'/icons/playlists-active.svg',iconSrc:'/icons/playlists.svg' },
        { key: 'search',href: "/search", text: "Search" , activeIcon:'/icons/Search-active.svg',iconSrc:'/icons/Search.svg'},

    ];

    
    return (
        <div className={styles.container}>
            <NavItem links={links}  />
        </div>
    )
}

export default ResponsiveMenu;