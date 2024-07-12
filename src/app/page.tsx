'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { ImageSizeVariant } from "./enums/imageSizeVariants";
import ToggleSwitch from "./Components/Toggle/Toggle";
import Input from "./Components/Input/Input";
import AddButton from "./Components/AddButton/AddButton";
import NavMenu from "./Components/NavMenu/NavMenu";
import Menu from "./Components/NavMenu/ResponsiveMenu/Menu";


export default function Home() {
  
  return (
    <main>
      <NavMenu/>
      <Menu/>
    </main>
  );
}
