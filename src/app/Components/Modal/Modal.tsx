import { ReactNode } from 'react';
import styles from './Modal.module.scss';
import CloseButton from '../CloseButton/CloseButton';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.header} >
                    {title &&
                        <p className={styles.title}>
                            {title}
                        </p>}
                    <CloseButton onclick={onClose} />

                </div>

                <>
                    {children}
                </>
                {footer && <>{footer}</>}
            </div>
        </div>
    );
};

export default Modal;
