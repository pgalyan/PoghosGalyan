import styles from './NotFound.module.css';
import Img404 from '../../../Assets/Images/404.png';

const NotFound = () => {
    return (
        <div className={styles.notFound} >
            <img src={Img404} alt="404" />
        </div>
    );
}

export default NotFound;