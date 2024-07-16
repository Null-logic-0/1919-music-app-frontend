'use client'
import NavItem from "../NavItem/NavItem";
import styles from './ResponsiveMenu.module.scss';



const ResponsiveMenu = () => {
    const links = [
        { key: 'home', href: "/home", text: "Home",activeIcon: '/icons/home-active.svg', iconSrc:'/icons/home.svg'},
        { key: 'favourite', href: "/favourite", text: "Favourite",activeIcon:'/icons/favourite-active.svg',iconSrc:'/icons/favourite.svg' },
        { key: 'search',href: "/search", text: "Search" , activeIcon:'/icons/Search-active.svg',iconSrc:'/icons/Search.svg'},

    ];

    
    return (
        <div className={styles.container}>
            <NavItem links={links}  />
        </div>
    )
}

export default ResponsiveMenu;