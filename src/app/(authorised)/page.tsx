'use client'
import PlayerController from "../Components/PlayerControler/PlayerControler";
import TableComponent from "../Components/TableComponent/TableComponent";
import styles from "./page.module.css";


export default function Home() {

  const dataSource = [
    {
      key: '1',
      id: 1,
      title: 'Voyage Voyage',
      artist: 'Desireless',
      plays: '34.675.542',
      album: 'Name',
      duration: '4:56mn',
      image: '/images/DesirelessCover.jpg',
    },
    {
      key: '2',
      id: 2,
      title: 'Enjoy The Silence',
      artist: 'Depeche Mode',
      plays: '34.675.542',
      album: 'Name',
      duration: '4:56mn',
      image: '/images/D.jpg',
    },
    {
      key: '3',
      id: 3,
      title: 'Tourner Dans Le Vide',
      artist: 'Indila',
      plays: '34.675.542',
      album: 'Name',
      duration: '4:56mn',
      image: '/images/indila.jpg',
    },
  ];

  return (
    <main>
      <TableComponent replaceButton={true} dataSource={dataSource} edit={true}/>
    </main>
  );
}
