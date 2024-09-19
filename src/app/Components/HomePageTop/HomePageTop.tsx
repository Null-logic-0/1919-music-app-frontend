"use client";
import styles from "./HomePageTop.module.scss";
import Logout from "../LogOut/LogOut";
import Search from "../Search/Search";
import { useState } from "react";

const HomePageTop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className={styles.container}>
      <Search
        placeHolder={"search"}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        icon
      />
      <Logout />
    </div>
  );
};

export default HomePageTop;
