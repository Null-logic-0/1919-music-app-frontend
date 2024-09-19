import { useState } from "react";
import axios from "axios";
import CloseButton from "../CloseButton/CloseButton";
import styles from "./Search.module.scss";
import Image from "next/image";
import Card from "../AlbumCard/Card";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";

type SearchProps = {
  icon?: boolean;
  placeHolder: string;
  onChange?: (value: string) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
};

type SearchResult = {
  id: number;
  authorName?: string;
  title?: string;
  name?: string;
  lastName?: string;
  type: "album" | "author";
  photo?: {
    url: string;
  };
};

const Search = ({
  icon,
  placeHolder,
  onChange,
  setSearchTerm,
  searchTerm,
}: SearchProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
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
        `https://one919-backend-1.onrender.com/search?q=${value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const { author = [], album = [] } = response.data;

      const formattedAuthors = author.map((item: any) => ({
        id: item.id,
        name: `${item.firstName} ${item.lastName}`,
        type: "author",
        photo: item.photo,
      }));

      const formattedAlbums = album.map((item: any) => ({
        id: item.id,
        title: item.title,
        type: "album",
        photo: item.photo,
      }));

      const mergedResults = [...formattedAuthors, ...formattedAlbums];

      if (Array.isArray(mergedResults)) {
        setSearchResults(mergedResults);
      } else {
        console.error("Unexpected response data format:", response.data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const clearInput = () => {
    setSearchTerm("");
    if (onChange) {
      onChange("");
    }
    setSearchResults([]);
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

      {searchTerm && (
        <div className={styles.searchResults}>
          {searchResults.map((result) => (
            <Card
              showDetails
              key={result.id}
              firstName={
                result.type === "author" ? result.name : result.authorName
              }
              images={result.photo?.url}
              name={result.type === "album" ? result?.title : undefined}
              link={
                result.type === "album"
                  ? `/topalbum/${result.id}`
                  : `/topartist/${result.id}`
              }
              route={
                result.type === "album"
                  ? `/topalbum/${result.id}`
                  : `/topartist/${result.id}`
              }
              imageSizeVariant={ImageSizeVariant.extraSmall}
              direction="row"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
