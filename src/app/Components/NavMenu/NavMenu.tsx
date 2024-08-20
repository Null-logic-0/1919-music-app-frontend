'use client'
import React, { useState } from 'react';
import NavItem from './NavItem/NavItem';
import style from './NavMenu.module.scss';
import Playlist from './Playlist/Playlist';
import AddButton from '../AddButton/AddButton';
import Modal from '../Modal/Modal';
import PlayListFrom from '../PlayListFrom/PlayListFrom';
import Image from 'next/image';

const data = [
    {
        id: '1',
        name: 'playlistName1',
        song: '23 songs',
        image: '/Images/playlist.png',
    },
    {
        id: '2',
        name: 'playlistName2',
        song: '23 songs',
        image: '/Images/playlist.png',
    },
    {
        id: '3',
        name: 'playlistName3',
        song: '23 songs',
        image: '/Images/playlist.png',
    },
    {
        id: '4',
        name: 'playlistName4',
        song: '23 songs',
        image: '/Images/playlist.png',
    },
    {
        id: '5',
        name: 'playlistName5',
        song: '23 songs',
        image: '/Images/playlist.png',
    },
    {
        id: '6',
        name: 'playlistName6',
        song: '23 songs',
        image: '/Images/playlist.png',
    },
];

const NavMenu = () => {
    const links = [
        { key: 'home', href: "/", text: "Home", activeIcon: '/Icons/home-active.svg', iconSrc: '/Icons/home.svg' },
        { key: 'Playlists', href: "/playlist", text: "Playlists", activeIcon: '/Icons/playlists-active.svg', iconSrc: '/Icons/playlists.svg' },
    ];


    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className={style.main}>
            <Image src={'/Icons/Logo.svg'} alt='logo' width={70} height={75}/>

            <div className={style.container}>
                <NavItem links={links} />

                <div className={style.playlist}>
                    <AddButton onClick={toggleModal} text='New Playlist' />
                    <div className={style.playlists}>
                        {data.map((list) => (
                            <Playlist
                                key={list.id}
                                image={list.image}
                                name={list.name}
                                link={`/playlist/${list.id}`}
                                song={list.song}
                            />
                        ))}

                    </div>

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
        </div>
    );
};

export default NavMenu;
