import { useState } from "react";
import axios from "axios";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./Search.module.scss";
import Image from "next/image";

type SearchProps = {
  icon?: boolean;
  placeHolder: string;
  onChange?: (value: string) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
};

const Search = ({
  icon,
  placeHolder,
  onChange,
  setSearchTerm,
  searchTerm,
}: SearchProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onChange) {
      onChange(value);
    }

    fetchSearchResults(value);
  };

  const fetchSearchResults = async (value: string) => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const response = await axios.get(
        `https://one919-backend.onrender.com/search?q=${value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data, "zd");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const clearInput = () => {
    setSearchTerm("");
    if (onChange) {
      onChange("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        {icon && (
          <Image
            src={"/Icons/Search.svg"}
            alt="search icon"
            width={24}
            height={24}
            className={styles.icon}
          />
        )}
        <input
          type="text"
          placeholder={placeHolder}
          onChange={handleInputChange}
          value={searchTerm}
          className={styles.input}
        />

        {searchTerm && (
          <div className={styles.closeButton}>
            <CloseButton onclick={clearInput} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
