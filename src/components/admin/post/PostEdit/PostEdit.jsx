import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePostContext } from "../../../../context/PostContext";
import styles from "./PostEdit.module.css";
import { useNavigate } from 'react-router-dom';

const AdminPostEdit = () => {
    const { setPost, admin } = usePostContext(); //contexto de post para obtener y actualizar post y obtener el user
    const { id } = useParams();//parámetro de la url -> id del post
    const [error, setError] = useState(null);
    const [valueImage, setValueImage] = useState('');
    const [valueTitle, setValueTitle] = useState('');
    const [valueText, setValueText] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
      const getPost = async () =>{
        let response = {}
        setPost({})

        try{
          response = await axios.get(`http://localhost:3000/api/admin/posts/${id}`, {
            headers: {
              'Authorization': `Bearer ${admin.token}`,
            }
          })
          const oldPost = response.data;
          setPost(oldPost); //actualizo post en el contexgo con los datos obtenidos
          setError(null); //borro error
          setValueImage(oldPost.image)
          setValueTitle(oldPost.title)
          setValueText(oldPost.text)

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

    const handleSubmit = async (e) => {
      e.preventDefault()

      if(valueImage === '' || valueTitle === '' || valueText === ''){
        setError('All fields are required');
        return;
      }

      try{
        const response = await axios.put( //solicitud de inicio sesi
            `http://localhost:3000/api/admin/posts/${id}`,
            {
                image: valueImage,
                title: valueTitle,
                text: valueText
            },
            {
              headers: {
                'Authorization': `Bearer ${admin.token}`,
              }
            }
        );
        setError(''); //limpio mensaje de error
        const updatedPost = response.data;
        setPost(updatedPost)
        navigate(`/admin/post/${id}`)

    } catch (err){
        setError(err.response.data.message); //muestro mensaje de error
    }

    }

    return (
      <div className={styles.postEdit}>
        <h1 className={styles.title}>Edit Post</h1>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.section}>
            <p><label for="image">Image:</label></p>
            <textarea type="text" id="image" name="image" value={valueImage} rows="5" cols="50" onChange={(e) => setValueImage(e.target.value)}/>
          </div>
          <div className={styles.section}>
            <p><label for="title">Title:</label></p>
            <input type="text" id="title" name="title" value={valueTitle} onChange={(e) => setValueTitle(e.target.value)}/>
          </div>
          <div className={styles.section}>
            <p><label for="text">Text:</label></p>
            <textarea type="text" id="text" name="text" value={valueText} rows="10" cols="50" onChange={(e) => setValueText(e.target.value)}/>
          </div>
          <button type="submit">Edit</button>
        </form>
        <span className={styles.error}>{error}</span>
      </div>
    )
}

export default AdminPostEdit;