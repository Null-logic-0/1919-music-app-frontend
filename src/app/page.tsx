'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { ImageSizeVariant } from "./enums/imageSizeVariants";
import Input from "./Components/Input/Input";
import AddButton from "./Components/AddButton/AddButton";
import Dropdown from "./Components/dropDown/dropDown";
import { useState } from "react";
import DayWeekDRP from "./Components/dropDown/DayWeekDropContent/DayWeek";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('Day')

  const onOptionSelected = (option: string) => {
    setSelectedOption(option)
  }

 
  return (
    <main>
                <Dropdown children={<DayWeekDRP onOptionSelected={onOptionSelected} />} button={selectedOption}  />

    </main>
  );
}
