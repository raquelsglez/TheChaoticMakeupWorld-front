import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePostContext } from "../../../context/PostContext";
import styles from "./PostDetail.module.css";


const PostDetail = () => {
    const { post, setPost } = usePostContext();
    const { id } = useParams();

    useEffect(()=>{
      const getPost = async () =>{
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const newPost = response.data;
        setPost(newPost);
      }

      getPost();
    }, []);

    return (
      <div className={styles.postDetail}>
        <img src={post.image} alt={post.title}></img>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
      </div>
    )
}

export default PostDetail;