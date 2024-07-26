import styles from './SeeAllButton.module.scss';


type ButtonProps = {
    onclick?: () => void;
    showAll?: boolean
}

const SeeAllButton = ({ onclick, showAll }: ButtonProps) => {
    return (
        <button className={styles.toggleButton} onClick={onclick}>
            {showAll ? 'show less' : 'see all'}
        </button>
    )
}

export default SeeAllButton;