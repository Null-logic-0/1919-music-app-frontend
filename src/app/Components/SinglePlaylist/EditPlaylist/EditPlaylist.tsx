import Modal from "../../Modal/Modal";
import MultiTaskButton from "../../MultiTaskButton/MultiTaskButton";
import Playlist from "../../NavMenu/Playlist/Playlist";
import PlayListFrom from "../../PlayListFrom/PlayListFrom";
import TabledropDown from "../../TableComponent/TabledropDown/TabledropDown";
import styles from "./EditPlaylist.module.scss";
import { useState } from "react";

interface addMusicProps {
  addMusic: () => void;
  playlist:{};
}
const EditPlaylist = ({ addMusic,playlist }: addMusicProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className={styles.main}>
      <div className={styles.pen}>
        <MultiTaskButton icon="/Icons/edit.svg" onclick={toggleDropdown} />
      </div>
      <div className={styles.container}>
        {dropdownOpen && (
          <>
            <TabledropDown onEdit={toggleModal} onAdd={addMusic} />
            {showModal && (
              <Modal
                setShowModal={setShowModal}
                isOpen={showModal}
                title="Edit details"
              >
                <PlayListFrom setShowModal={setShowModal} playlist={playlist}/>
              </Modal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditPlaylist;
