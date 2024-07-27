import { Table } from 'antd';
import { SongInterface } from '@/app/interfaces/Song.interface';
import { useRecoilState } from 'recoil';
import { currentTrackIndexState, playbackStatusState } from '../../helpers/State';
import { PlaybackStatus } from '../../enums/player.enums';
import { renderTitleColumn, renderPlaysColumn, renderAlbumColumn, renderDurationColumn } from './TableItem/TableItem';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import ActionsColumn from './ActionsColumn/ActionsColumn';
import Image from 'next/image';
import styles from './TableComponent.module.scss'
import { useState } from 'react';
import TabledropDown from './TabledropDown/TabledropDown';
import Modal from '../Modal/Modal';
import PlayListFrom from '../PlayListFrom/PlayListFrom';

const dataSource: SongInterface[] = [
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

type TableProps = {
  replaceButton: boolean;
  showThead?: boolean;
};

const SongTable = ({ replaceButton, showThead }: TableProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(currentTrackIndexState);
  const [playbackStatus, setPlaybackStatus] = useRecoilState(playbackStatusState);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleModal = () => {
    setShowModal(!showModal);

  };
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: SongInterface) => renderTitleColumn(record),
    },
    {
      title: 'Plays',
      dataIndex: 'plays',
      key: 'plays',
      render: (text: string) => renderPlaysColumn(text),
    },
    {
      title: 'Album',
      dataIndex: 'album',
      key: 'album',
      render: (text: string) => renderAlbumColumn(text),
    },
    {
      title: <Image src="/icons/Time.svg" alt="icon" width={36} height={36} />,
      dataIndex: 'duration',
      key: 'duration',
      render: (text: string) => renderDurationColumn(text),
    },
    {
      title: <MultiTaskButton icon="/icons/edit.svg" onclick={toggleDropdown} />,

      key: 'actions',
      render: (text: string, record: SongInterface) => {
        const isPlaying = currentTrackIndex !== null && dataSource[currentTrackIndex]?.id === record.id && playbackStatus === PlaybackStatus.PLAYING;

        const onPlayPauseClick = () => {
          const trackIndex = dataSource.findIndex(song => song.id === record.id);

          if (isPlaying) {
            setPlaybackStatus(PlaybackStatus.PAUSED);
          } else {
            if (playbackStatus === PlaybackStatus.PLAYING && currentTrackIndex !== trackIndex) {
              setPlaybackStatus(PlaybackStatus.PAUSED);
            }
            setCurrentTrackIndex(trackIndex);
            setPlaybackStatus(PlaybackStatus.PLAYING);
          }
        };

        return <ActionsColumn record={record} replaceButton={replaceButton} isPlaying={isPlaying} onPlayPauseClick={onPlayPauseClick} />;
      },
    },
  ];

  const handleRowClick = (record: SongInterface) => {
    const trackIndex = dataSource.findIndex(song => song.id === record.id);
    if (currentTrackIndex !== trackIndex || playbackStatus !== PlaybackStatus.PLAYING) {
      setCurrentTrackIndex(trackIndex);
      setPlaybackStatus(PlaybackStatus.PLAYING);
    }
  };

  return (
    <div className={styles.tableContainer}>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={showThead}
        rowKey="key"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <div className={styles.container}>
        {
          dropdownOpen && (

            <>
              <TabledropDown onEdit={toggleModal} />
              {showModal && (
                <Modal
                  setShowModal={setShowModal}
                  isOpen={showModal}
                  title="Edit details"
                >
                  <PlayListFrom setShowModal={setShowModal} />
                </Modal>
              )}
            </>
          )
        }

      </div>

    </div>
  );
};

export default SongTable;
