"use client";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem/NavItem";
import style from "./NavMenu.module.scss";
import Playlist from "./Playlist/Playlist";
import AddButton from "../AddButton/AddButton";
import Modal from "../Modal/Modal";
import PlayListFrom from "../PlayListFrom/PlayListFrom";
import Image from "next/image";
import { FormDataInterface } from "@/app/interfaces/PlaylistForm.interface";
import axios from "axios";

const links = [
  {
    key: "home",
    href: "/",
    text: "Home",
    activeIcon: "/Icons/home-active.svg",
    iconSrc: "/Icons/home.svg",
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

const NavMenu = () => {
  const [dataSource, setDataSource] = useState<FormDataInterface[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPlaylist();
  }, [dataSource]);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(
        "https://one919-backend.onrender.com/playlist",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );
      setDataSource(response.data);
    } catch (error) {
    }
  };

  const addNewPlaylist = (newPlaylist: FormDataInterface) => {
    setDataSource((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    fetchPlaylist();
  };

  const deletePlaylist = async (id: number) => {
    try {
      await axios.delete(`https://one919-backend.onrender.com/playlist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      setDataSource((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== id)
      );
    } catch (error) {
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={style.main}>
      <Image src={"/Icons/Logo.svg"} alt="logo" width={70} height={75} />

      <div className={style.container}>
        <NavItem links={links} />

        <div className={style.playlist}>
          <AddButton onClick={toggleModal} text="New Playlist" />
          <div className={style.playlists}>
            {dataSource.map((list) => (
              <Playlist
                key={list.id}
                id={list.id}
                image={list.photo.url}
                name={list.name}
                link={`/createdPlaylists/${list.id}`}
                count={list.count}
                remove={deletePlaylist}
              />
            ))}
          </div>
        </div>

        {showModal && (
          <Modal
            setShowModal={setShowModal}
            isOpen={showModal}
            title="New Playlist"
          >
            <PlayListFrom
              setShowModal={setShowModal}
              addNewPlaylist={addNewPlaylist}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NavMenu;
