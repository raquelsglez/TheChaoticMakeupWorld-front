import { useNavigate } from 'react-router-dom';
import styles from "./PostCard.module.css"

const AdminPostCard = ({post}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/admin/post/${post.id}`); //navegacion a la PostDetail
    };

    return (
        <div className={styles.postCard} onClick={handleClick}>
            <p>{post.title}</p>
            <img src={post.image} alt={post.title}></img>
        </div>
    )
}

export default AdminPostCard;