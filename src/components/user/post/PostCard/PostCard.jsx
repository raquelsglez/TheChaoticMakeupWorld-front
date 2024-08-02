import { useNavigate } from 'react-router-dom';
import styles from "./PostCard.module.css"

const PostCard = ({post}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${post.id}`); //navegacion a la PostDetail
    };

    return (
        <div className={styles.postCard} onClick={handleClick}>
            <p>{post.title}</p>
            <img src={post.image} alt={post.title}></img>
        </div>
    )
}

export default PostCard;