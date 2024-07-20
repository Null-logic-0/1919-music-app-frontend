'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { ImageSizeVariant } from "./enums/imageSizeVariants";
import ToggleSwitch from "./Components/Toggle/Toggle";
import Input from "./Components/Input/Input";
import AddButton from "./Components/AddButton/AddButton";
import Dropdown from "./Components/dropDown/dropDown";
import { useState } from "react";
import DayWeekDRP from "./Components/dropDown/DayWeekDropContent/DayWeek";
import NavMenu from "./Components/NavMenu/NavMenu";
import ResponsiveMenu from "./Components/NavMenu/ResponsiveMenu/ResponsiveMenu";
import PlayListFrom from "./Components/PlayListFrom/PlayListFrom";


export default function Home() {
  const [selectedOption, setSelectedOption] = useState('Day')

  const onOptionSelected = (option: string) => {
    setSelectedOption(option)
  }

  return (
    <main>
    </main>
  );
}
