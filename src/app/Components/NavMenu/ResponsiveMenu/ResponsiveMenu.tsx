"use client";
import NavItem from "../NavItem/NavItem";
import styles from "./ResponsiveMenu.module.scss";

const ResponsiveMenu = () => {
  const links = [
    {
      key: "home",
      href: "/",
      text: "Home",
      activeIcon: "/Icons/home-active.svg",
      iconSrc: "/Icons/home.svg",
    },
    {
      key: "musics",
      href: "/musics",
      text: "Musics",
      activeIcon: "/Icons/musics-active.svg",
      iconSrc: "/Icons/musics.svg",
    },
    {
      key: "Playlists",
      href: "/createdPlaylists",
      text: "Playlists",
      activeIcon: "/Icons/playlists-active.svg",
      iconSrc: "/Icons/playlists.svg",
    },
    {
      key: "Favourites",
      href: "/favourites",
      text: "Favourites",
      activeIcon: "/Icons/favourite-active.svg",
      iconSrc: "/Icons/favourite.svg",
    },
  ];

  return (
    <div className={styles.container}>
      <NavItem links={links} />
    </div>
  );
};

export default ResponsiveMenu;
