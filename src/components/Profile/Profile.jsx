import { usePostContext } from "../../context/PostContext";
import { CiLogout } from "react-icons/ci";
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = usePostContext();
    const navigate = useNavigate()

    const handleClick = () => {
        setUser({}) //limpiar usuario en el contexto al hacer logout
        navigate('/login');
        return;
    }

    return(
        <div className={styles.profile}>
            <h1>{user.username}</h1>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.email}</p>
            <div onClick={handleClick} className={styles.logout}>
                <p>Logout</p>
                <CiLogout />
            </div>
        </div>
    )
};

export default Profile;
