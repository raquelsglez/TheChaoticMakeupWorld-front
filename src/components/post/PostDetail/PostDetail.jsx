import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePostContext } from "../../../context/PostContext";
import styles from "./PostDetail.module.css";


const PostDetail = () => {
    const { post, setPost } = usePostContext();
    const { id } = useParams();
    const [error, setError] = useState(null);

    useEffect(()=>{
      const getPost = async () =>{

        try{
          const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
          const newPost = response.data;
          setPost(newPost);
          setError(null);

        } catch (err){
          if (err.response && err.response.status === 404) {
            setError("Post not found");
          } else {
            setError("An error occurred while fetching the post");
          }
        setPost(null);
        }
      }

      getPost();
    }, [id]);

    if (error){
      return (
        <div className={styles.postDetail}>
          <p>{error}</p>
        </div>
      )
    }
    return (
      <div className={styles.postDetail}>
        <img src={post.image} alt={post.title}></img>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
      </div>
    )
}

export default PostDetail;