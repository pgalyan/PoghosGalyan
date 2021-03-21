import styles from './Preloader.module.css'


const Preloader = () => {
    return(
        <div className={styles.spinner}>
            <div className={styles.loader}></div>
        </div>
    )
     
}

export default Preloader