import { useEffect, useState } from "react";
import axios from 'axios';
import { usePostContext } from "../../../context/PostContext";
import PostCard from "../PostCard/PostCard";
import styles from "./PostList.module.css"
import { SlArrowDown } from "react-icons/sl";


const PostList = () => {
    const { posts, setPosts } = usePostContext(); //contexto de post para obetner y actualizar posts
    const [isArrowUp, setIsArrowUp] = useState(false); //estado para el orden de los posts
    const [valueTitle, setValueTitle] = useState(''); //estado para el filtro tittle
    const [error, setError] = useState(null);

    useEffect(()=>{
      const getPosts = async () =>{

        try{
          const order = isArrowUp ? 'order=created_at': 'order=-created_at' //ordena por fecha-creacion
          const title = valueTitle ? `title=${valueTitle}`: '' //filtrado por tittle
          const response = await axios.get(`http://localhost:3000/api/posts?${order}&${title}`);

          const newPosts = response.data;
          setPosts(newPosts);//actualizo posts
          setError(null);//borro error

        } catch (err){
          setError("An error occurred while fetching the posts");
          setPosts(null);
        }
      }

      getPosts();
    }, [isArrowUp, valueTitle]);

    const handleOrderingClick = () => {
      setIsArrowUp(!isArrowUp); //cambiar estado del orden
    };

    if (error){
      return (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
    )

    }
    return (
      <div className={styles.postListPage}>
        <div className={styles.filters}>
          <div className={styles.ordering} onClick={handleOrderingClick}>
            <p> Fecha de creción</p>
            <SlArrowDown className={isArrowUp ? styles.arrowUp : styles.arrowDown } />
          </div>
          <div className={styles.titleFilter}>
            <p>Título:</p>
            <input value={valueTitle} onChange={(e)=>setValueTitle(e.target.value)}/>
          </div>
        </div>
        <div className={styles.postList}>
          {posts.map((post) => <PostCard key={post.id} post={post}/>)}
        </div>
      </div>
    )
}

export default PostList;