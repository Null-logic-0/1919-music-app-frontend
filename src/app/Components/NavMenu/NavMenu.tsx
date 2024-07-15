import React, { useState } from 'react';
import NavItem from './NavItem/NavItem';
import style from './NavMenu.module.scss';
import Playlist from './Playlist/Playlist';
import AddButton from '../AddButton/AddButton';
import Modal from '../Modal/Modal';

const data = [
    {
        id: '1',
        name: 'playlistName1',
        song: '23 songs',
        image: '/images/playlist.png',
        link: '/'
    },
    {
        id: '2',
        name: 'playlistName2',
        song: '23 songs',
        image: '/images/playlist.png',
        link: '/'
    },
    {
        id: '3',
        name: 'playlistName3',
        song: '23 songs',
        image: '/images/playlist.png',
        link: '/'
    },
];

const NavMenu = () => {
    const links = [
        { key: 'home', href: "/home", text: "Home" },
        { key: 'favourite', href: "/favourite", text: "Favourite" },
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
                <NavItem iconSrc={iconSrc} activeIcons={activeIcons} links={links} />

                <div className={style.playlist}>
                    <AddButton onClick={toggleModal} text='New Playlist'/>

                    {data.map((list) => (
                        <Playlist
                            key={list.id}
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
