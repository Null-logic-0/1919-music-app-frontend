'use client'
import NavItem from "../NavItem/NavItem";
import styles from './ResponsiveMenu.module.scss';



const ResponsiveMenu = () => {
    const links = [
        { key: 'home', href: "/", text: "Home",activeIcon: '/Icons/home-active.svg', iconSrc:'/Icons/home.svg'},
        { key: 'Playlists', href: "/playlist", text: "Playlists",activeIcon:'/Icons/playlists-active.svg',iconSrc:'/Icons/playlists.svg' },
        { key: 'search',href: "/search", text: "Search" , activeIcon:'/Icons/Search-active.svg',iconSrc:'/Icons/Search.svg'},

    ];

    
    return (
        <div className={styles.container}>
            <NavItem links={links}  />
        </div>
    )
}

export default ResponsiveMenu;