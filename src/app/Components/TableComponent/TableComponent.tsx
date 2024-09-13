"use client";
import { Table } from "antd";
import { SongInterface } from "@/app/interfaces/Song.interface";
import { renderTitleColumn } from "./TableItem/TableItem";
import styles from "./TableComponent.module.scss";
import TrackActions from "./TrackActions/TrackActions";
import Edit from "./Edit/Edit";

type TableProps = {
  replaceButton: boolean;
  showThead?: boolean;
  edit?: boolean;
  dataSource: SongInterface[];
  addMusic?: (musicId: string) => void;
  editMusic?: () => void;
  remove?: (musicId: string) => void;
  onPlayMusic?: (track: SongInterface) => void;  // Updated
};

const TableComponent = ({
  replaceButton,
  showThead,
  dataSource,
  edit,
  remove,
  addMusic,
  editMusic,
  onPlayMusic,  
}: TableProps) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: SongInterface) =>
        renderTitleColumn(record),
    },
    {
      title: edit ? <Edit EditMusic={editMusic} /> : "",
      key: "actions",
      render: (text: string, record: SongInterface) => {
        return (
          <TrackActions
            addMusic={() => addMusic?.(record.id)}
            remove={() => remove?.(record.id)}
            record={record}
            replaceButton={replaceButton}
            dataSource={dataSource}
            onPlayMusic={() => onPlayMusic?.(record)}  
          />
        );
      },
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      showHeader={showThead}
      rowKey="id"
      className={styles.table}
    />
  );
};

export default TableComponent;
