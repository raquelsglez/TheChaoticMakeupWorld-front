import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePostContext } from "../../../context/PostContext";
import styles from "./PostDetail.module.css";
import { BsBalloonHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
    const { post, setPost, user } = usePostContext(); //contexto de post para obtener y actualizar post y obtener el user
    const { id } = useParams();//parámetro de la url -> id del post
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
      const getPost = async () =>{
        let response = {}
        setPost({})

        try{
          if (user.id){ //si el usuario está logueado, realizo una peticion con autorizacion -> con el id de user
            response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/posts/${id}`, {
              headers: {
                'Authorization': `Bearer ${user.token}`,
              }
            });
          }else{ //si no esta logueado, sin autorizacion
            response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/posts/${id}`);
          }

          const newPost = response.data;
          setPost(newPost); //actualizo post en el contexgo con los datos obtenidos
          setError(null); //borro error

        } catch (err){
          if (err.response && err.response.status === 404) { //errores de la respouesta de la solictud(HTTP)
            setError("Post not found");
          } else {
            setError("An error occurred while fetching the post");
          }
          setPost(null); //al mostrar un error -> limpio post en el contexto
        }
      }

      getPost();
    }, [id]);

    const handleClick = async() => { //al hacer click en el icono favorito:
      if (user.id){ //si el usuario esta logueado:

        if(post.is_favorite){ //si el post es favorito, solicitud para quitarlo de favoritos
          try{
            await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/posts/${id}/unfavorites`, {}, {
              headers: {
                'Authorization': `Bearer ${user.token}`,
              }
            });

          } catch (err){
            setError("An error occurred while trying to do unfavorite");
          };

        }else{ //si el post no es favorito, solicitud para añadir a favoritos
          try{
            await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/posts/${id}/favorites`, {}, {
              headers: {
                'Authorization': `Bearer ${user.token}`,
              }
            })
          } catch (err){
            setError("An error occurred while trying to do favorite");
          };
        }
        
        //reflejar el cambio de favorito
        const postUpdated = {...post}; //generar copia de post
        postUpdated.is_favorite = !postUpdated.is_favorite; //cambio de is_favorite: true -> a -> false
        setPost(postUpdated);
        setError("");

      } else {
        navigate('/login'); //si el usuario no está logueado, navega al login al hacer click en el icono
      }
    }

    if (error){
      return (
        <div className={styles.postDetail}>
          <p>{error}</p>
        </div>
      )
    };

    return (
      <div className={styles.postDetail}>
        <BsBalloonHeartFill size={50} className={`${post.is_favorite ? styles.favorite : styles.unfavorite}`} onClick={handleClick}/>
        <img src={post.image} alt={post.title}></img>
        <h1 className={styles.title}>{post.title}</h1>
        <p>{post.text}</p>
      </div>
    )
}

export default PostDetail;