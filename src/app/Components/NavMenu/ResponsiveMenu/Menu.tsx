import NavList from "../NavList/NavList";
import styles from './Menu.module.scss';



const Menu = () => {
    const links = [
        { href: "/home", text: "Home" },
        { href: "/favourite", text: "favourite" },
        { href: "/search", text: "Search" },

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
            <NavList links={links} iconSrc={iconSrc} activeIcons={activeIcons} />
        </div>
    )
}

export default Menu;