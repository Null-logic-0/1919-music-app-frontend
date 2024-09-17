/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddButton from "../AddButton/AddButton";
import styles from "./Playlist.module.scss";
import Modal from "../Modal/Modal";
import PlayListFrom from "../PlayListFrom/PlayListFrom";
import Card from "../AlbumCard/Card";
import { ImageSizeVariant } from "@/app/enums/imageSizeVariants";
import { FormDataInterface } from "@/app/interfaces/PlaylistForm.interface";

const Playlists = () => {
  const [playlists, setPlaylists] = useState<FormDataInterface[]>([]);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("accesstoken");

  const fetchPlaylists = async () => {
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.get(
        "https://one919-backend.onrender.com/playlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlaylists(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [playlists]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddPlaylist = async (newPlaylist: FormDataInterface) => {
    try {
      await axios.post(
        "https://one919-backend.onrender.com/playlist",
        newPlaylist,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPlaylists();
      setShowModal(false);
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  const deletePlaylist = async (id: number) => {
    try {
      await axios.delete(`https://one919-backend.onrender.com/playlist/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      fetchPlaylists();
    } catch (error) {
      console.error(`Error deleting playlist: ${error}`);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <AddButton onClick={toggleModal} text="Add New Playlist" />
      </div>
      <div className={styles.albumWrapper}>
        {playlists.map((list) => (
          <Card
            key={list.id}
            images={list.photo.url}
            showDetails
            name={list.name}
            count={list.count}
            imageSizeVariant={ImageSizeVariant.Medium}
            direction="column"
            link={`/playlist/${list.id}`}
            remove={deletePlaylist}
            id={list.id}
          />
        ))}
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          isOpen={showModal}
          title="Add New Playlist"
        >
          <PlayListFrom
            setShowModal={setShowModal}
            addNewPlaylist={handleAddPlaylist}
          />
        </Modal>
      )}
    </div>
  );
};

export default Playlists;
