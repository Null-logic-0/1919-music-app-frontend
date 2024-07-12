import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import CloseButton from '../CloseButton/CloseButton';

interface ModalProps {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    setShowModal:(value: boolean) => void;

}

const Modal = ({ isOpen, title, children,setShowModal }: ModalProps) => {
    if (!isOpen) return null;
    const handleCloseModal =()=>{
        setShowModal(false)

    }



    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header} >
                    {title &&
                        <p className={styles.title}>
                            {title}
                        </p>}
                    <CloseButton onclick={handleCloseModal} />

                </div>

                <>
                    {children}
                </>
               
            </div>
        </div>
    );
};

export default Modal;
