'use client'
import { Table } from 'antd';
import { SongInterface } from '@/app/interfaces/Song.interface';
import { useRecoilState } from 'recoil';
import { currentTrackIndexState, playbackStatusState } from '../../helpers/State';
import { renderTitleColumn, renderPlaysColumn, renderAlbumColumn, renderDurationColumn } from './TableItem/TableItem';
import MultiTaskButton from '../MultiTaskButton/MultiTaskButton';
import Image from 'next/image';
import styles from './TableComponent.module.scss';
import { useState } from 'react';
import TabledropDown from './TabledropDown/TabledropDown';
import Modal from '../Modal/Modal';
import PlayListFrom from '../PlayListFrom/PlayListFrom';
import TrackActions from './TrackActions/TrackActions';
import Edit from './Edit/Edit';

type TableProps = {
  replaceButton: boolean;
  showThead?: boolean;
  edit?: boolean;
  dataSource: SongInterface[]
  add?:()=>void;
};

const TableComponent = ({ replaceButton, showThead, dataSource, edit,add }: TableProps) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(currentTrackIndexState);
  const [playbackStatus, setPlaybackStatus] = useRecoilState(playbackStatusState);
  

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
      title: <Image src="/Icons/Time.svg" alt="icon" width={36} height={36} />,
      dataIndex: 'duration',
      key: 'duration',
      render: (text: string) => renderDurationColumn(text),
    },
    {

      title: edit ? (<Edit addMusic={add}/>) : '',
      key: 'actions',
      render: (text: string, record: SongInterface) => {
        return <TrackActions record={record} replaceButton={replaceButton} dataSource={dataSource} />;
      },
    },
  ];

  return (
    <div className={styles.tableContainer}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={showThead}
        rowKey="key"
        className={styles.table}
      />

    </div>
  );
};

export default TableComponent;
