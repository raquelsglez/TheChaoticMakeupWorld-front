import { useEffect, useState } from "react";
import axios from 'axios';
import { usePostContext } from "../../../context/PostContext";
import PostCard from "../PostCard/PostCard";
import styles from "./PostList.module.css"
import { SlArrowDown } from "react-icons/sl";


const PostList = () => {
    const { posts, setPosts } = usePostContext();
    const [isArrowUp, setIsArrowUp] = useState(false);
    const [valueTitle, setValueTitle] = useState('');

    useEffect(()=>{
      const getPosts = async () =>{
        const order = isArrowUp ? 'order=created_at': 'order=-created_at' 
        const title = valueTitle ? `title=${valueTitle}`: ''
        const response = await axios.get(`http://localhost:3000/api/posts?${order}&${title}`);
        const newPosts = response.data;
        setPosts(newPosts);
      }

      getPosts();
    }, [isArrowUp, valueTitle]);

    const handleOrderingClick = () => {
      setIsArrowUp(!isArrowUp);
    };

    return (
      <div className={styles.postListPage}>
        <div className={styles.filters}>
          <div className={styles.ordering} onClick={handleOrderingClick}>
            <p> Fecha de creción</p>
            <SlArrowDown className={isArrowUp ? styles.arrowUp : styles.arrowDown } />
          </div>
          <div className={styles.titleFilter}>
            <p>Título:</p>
            <input value={valueTitle} onChange={(e)=>setValueTitle(e.target.value)}></input>
          </div>
        </div>
        <div className={styles.postList}>
          {posts.map((post) => <PostCard key={post.id} post={post}/>)}
        </div>
      </div>
    )
}

export default PostList;