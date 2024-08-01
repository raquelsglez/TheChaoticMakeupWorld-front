import { usePostContext } from "../../context/PostContext";
import { CiLogout } from "react-icons/ci";
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";

const Profile = () => {
    const { user, setUser } = usePostContext();
    const navigate = useNavigate()

    const handleClickLogout = () => {
        setUser({}) //limpiar usuario en el contexto al hacer logout
        localStorage.setItem('user', JSON.stringify({}));
        navigate('/login');
        return;
    }

    const handleClickFavorites = () => {
        navigate('/favorites');
        return;
    }

    return(
        <div className={styles.profile}>
            <h1>{user.username}</h1>
            <p>{user.first_name} {user.last_name}</p>
            <p>{user.email}</p>
            <div onClick={handleClickFavorites} className={styles.favoritePosts}>
                <p>My favorite posts</p>
                <MdFavorite className={styles.favoritePostsIcon}/>
            </div>
            <div onClick={handleClickLogout} className={styles.logout}>
                <p>Logout</p>
                <CiLogout />
            </div>
        </div>
    )
};

export default Profile;
