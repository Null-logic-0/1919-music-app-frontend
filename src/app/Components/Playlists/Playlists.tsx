'use client'
import { useState } from "react";
import AddButton from "../AddButton/AddButton";
import styles from "./Playlist.module.scss";
import Modal from "../Modal/Modal";
import PlayListFrom from "../PlayListFrom/PlayListFrom";
import Card from "../AlbumCard/Card";
import { ImageSizeVariant, imageSizeVariants } from "@/app/enums/imageSizeVariants";
import PagesHeaderTop from "../PagesHeaderTop/PagesHeaderTop";

const playlistData = [
    {
        id: '1',
        name: 'playlistName1',
        song: '23 songs',
        image: '/Images/album1.png',
    },
    {
        id: '2',
        name: 'playlistName2',
        song: '23 songs',
        image: '/Images/album2.png',
    },
    {
        id: '3',
        name: 'playlistName3',
        song: '23 songs',
        image: '/Images/album3.png',
    },
    {
        id: '4',
        name: 'playlistName1',
        song: '23 songs',
        image: '/Images/album4.png',
    },
    {
        id: '5',
        name: 'playlistName2',
        song: '23 songs',
        image: '/Images/album5.png',
    },

]

const Playlists = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    return (
        <div className={styles.container}>

            <div>
                <AddButton onClick={toggleModal} text='New Playlist' />
            </div>
            <div className={styles.albumWrapper}>
                {
                    playlistData.map((list) => (
                        <Card key={list.id}
                            images={list.image}
                            showDetails
                            title={list.name}
                            subtitle={list.song}
                            imageSizeVariant={ImageSizeVariant.Small}
                            direction="row"
                            link={`/playlist/${list.id}`}
                        />
                    ))

                }

            </div>

            {showModal && (
                <Modal
                    setShowModal={setShowModal}
                    isOpen={showModal}
                    title="Edit details"
                >
                    <PlayListFrom setShowModal={setShowModal} />
                </Modal>
            )}
        </div>


    )
}

export default Playlists;