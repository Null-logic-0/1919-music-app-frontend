import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./NavItem.module.scss";

type NavLink = {
  key: string;
  href: string;
  text?: string;
};

type NavListProps = {
  links: NavLink[];
  iconSrc: string[];
  activeIcons: string[];
};

const NavItem = ({ links, iconSrc, activeIcons }: NavListProps) => {
  const pathname = usePathname();

  return (
    <ul className={styles.navList}>
      {links.map((link, index) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.key} className={styles.navItem}>
            <Link href={link.href} passHref className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
              <Image
                src={isActive ? activeIcons[index] : iconSrc[index]}
                alt={link.text || "Link icon"}
                width={32}
                height={32}
                className={styles.navIcon}
              />
              {link.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItem;
