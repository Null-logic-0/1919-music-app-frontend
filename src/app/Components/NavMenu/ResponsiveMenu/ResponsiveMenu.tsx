import NavItem from "../NavItem/NavItem";
import styles from './ResponsiveMenu.module.scss';



const ResponsiveMenu = () => {
    const links = [
        { key: 'home',href: "/home", text: "Home" },
        { key: 'favourite',href: "/favourite", text: "favourite" },
        { key: 'search',href: "/search", text: "Search" },

    ];

    const iconSrc = [
        "/icons/home.svg",
        "/icons/favourite.svg",
        "/icons/Search.svg"
    ];

    const activeIcons = [
        "/icons/home-active.svg",
        "/icons/favourite-active.svg",
        "/icons/Search-active.svg"

    ];
    return (
        <div className={styles.container}>
            <NavItem links={links} iconSrc={iconSrc} activeIcons={activeIcons} />
        </div>
    )
}

export default ResponsiveMenu;