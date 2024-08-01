import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePostContext } from "../../../../context/PostContext";
import styles from "./PostDetail.module.css";
import { GiTrashCan } from "react-icons/gi";
import { Link } from "react-router-dom";

const AdminPostDetail = () => {
    const { post, setPost, admin } = usePostContext(); //contexto de post para obtener y actualizar post y obtener el user
    const { id } = useParams();//parámetro de la url -> id del post
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
      const getPost = async () =>{
        let response = {}
        setPost({})

        try{
          response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/admin/posts/${id}`, {
            headers: {
              'Authorization': `Bearer ${admin.token}`,
            }
          })
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

    const handleClickDelete = async() => {
      try{
        await axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/api/admin/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${admin.token}`,
          }
        });

        setConfirmation("The post has been successfully deleted.")
        setShowModal(false);

      } catch (err){
        setError("An error occurred while trying to delete the post");
      };
    }

    const handleOpenModalDelete = () => {
      setShowModal(true);
    };

    const handleCloseModalDelete = () => {
      setShowModal(false);
    };

    if (error){
      return (
        <div className={styles.postDetail}>
          <p>{error}</p>
        </div>
      )
    };

    if (confirmation){
      return (
        <div className={styles.postDetail}>
          <p>{confirmation}</p>
        </div>
      )
    }

    if (showModal){
      return (
      <div className={styles.postDetail}>
        <GiTrashCan size={50} className={styles.deleteIcon} onClick={handleOpenModalDelete}/>
        <img src={post.image} alt={post.title}></img>
        <h1 className={styles.title}>{post.title}</h1>
        <p>{post.text}</p>
        <Link className={styles.linkEdit} to={`/admin/post/${id}/edit`}>Edit</Link>

        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this post?</p>
            <div className={styles.modalConditions}>
              <button onClick={handleClickDelete}>SI</button>
              <button onClick={handleCloseModalDelete}>NO</button>
            </div>
          </div>
        </div>
      </div>
      )
    }

    return (
      <div className={styles.postDetail}>
        <GiTrashCan size={50} className={styles.deleteIcon} onClick={handleOpenModalDelete}/>
        <img src={post.image} alt={post.title}></img>
        <h1>{post.title}</h1>
        <p>{post.text}</p>
        <Link className={styles.linkEdit} to={`/admin/post/${id}/edit`}>Edit</Link>
      </div>
    )
}

export default AdminPostDetail;