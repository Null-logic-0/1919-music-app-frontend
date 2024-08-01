import Modal from '../../Modal/Modal';
import MultiTaskButton from '../../MultiTaskButton/MultiTaskButton';
import PlayListFrom from '../../PlayListFrom/PlayListFrom';
import TabledropDown from '../TabledropDown/TabledropDown';
import styles from './Edit.module.scss';
import { useState } from 'react';


const Edit = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
    const toggleModal = () => setShowModal(!showModal);
    
    return (
        <div className={styles.main}>
            <div className={styles.pen}>
                <MultiTaskButton icon="/icons/edit.svg" onclick={toggleDropdown} />
            </div>
            <div className={styles.container}>
                {dropdownOpen && (
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
                )}
            </div>
        </div>
    )
}

export default Edit;