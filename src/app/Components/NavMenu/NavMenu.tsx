'use client'
import React, { useState } from 'react';
import NavItem from './NavItem/NavItem';
import style from './NavMenu.module.scss';
import Playlist from './Playlist/Playlist';
import AddButton from '../AddButton/AddButton';
import Modal from '../Modal/Modal';
import PlayListFrom from '../PlayListFrom/PlayListFrom';

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
        { key: 'home', href: "/home", text: "Home",activeIcon: '/icons/home-active.svg', iconSrc:'/icons/home.svg'},
        { key: 'favourite', href: "/favourite", text: "Favourite",activeIcon:'/icons/favourite-active.svg',iconSrc:'/icons/favourite.svg' },
    ];


    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className={style.main}>
            <h1 className={style.logo}>TnNdshN</h1>

            <div className={style.container}>
                <NavItem  links={links}/>

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
