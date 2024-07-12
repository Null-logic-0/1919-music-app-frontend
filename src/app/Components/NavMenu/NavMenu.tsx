import React, { useState } from 'react';
import Image from 'next/image';
import NavList from './NavList/NavList';
import style from './NavMenu.module.scss';
import Playlist from './Playlist/Playlist';
import AddButton from '../AddButton/AddButton';
import CloseButton from '../CloseButton/CloseButton';
import Modal from '../Modal/Modal';

const data = [
    {
        name: 'playlistName',
        song: '23 songs',
        image: '/images/playlist.png',
        link: '/'
    },
    {
        name: 'playlistName',
        song: '23 songs',
        image: '/images/playlist.png',
        link: '/'
    },
    {
        name: 'playlistName',
        song: '23 songs',
        image: '/images/playlist.png',
        link: '/'
    },
];

const NavMenu = () => {
    const links = [
        { href: "/home", text: "Home" },
        { href: "/favourite", text: "Favourite" },
    ];

    const iconSrc = ["/icons/home.svg", "/icons/favourite.svg"];
    const activeIcons = ["/icons/home-active.svg", "/icons/favourite-active.svg"];

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        console.log('Modal toggled');
    };

    return (
        <div className={style.main}>
            <h1 className={style.logo}>TnNdshN</h1>

            <div className={style.container}>
                <NavList links={links} iconSrc={iconSrc} activeIcons={activeIcons} />

                <div className={style.playlist}>
                    <AddButton onClick={toggleModal} text='New Playlist'/>

                    {data.map((list, index) => (
                        <Playlist
                            key={index}
                            image={list.image}
                            name={list.name}
                            link={list.link}
                            song={list.song}
                        />
                    ))}
                </div>

                {showModal && (
                    <Modal
                        setShowModal={setShowModal}
                        isOpen={showModal}
                        title="This modal"
                    >
                        <p>This is the modal.</p>
                        
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default NavMenu;
