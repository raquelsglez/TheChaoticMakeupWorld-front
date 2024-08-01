import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { usePostContext } from "../../../../context/PostContext";
import styles from "./PostCreate.module.css";
import { useNavigate } from 'react-router-dom';

const AdminPostCreate = () => {
    const { setPost, admin } = usePostContext(); //contexto de post para obtener y actualizar post y obtener el user
    const [error, setError] = useState(null);
    const [valueImage, setValueImage] = useState('');
    const [valueTitle, setValueTitle] = useState('');
    const [valueText, setValueText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault()

      if(valueImage === '' || valueTitle === '' || valueText === ''){
        setError('All fields are required');
        return;
      }

      try{
        const response = await axios.post( //solicitud de inicio sesi
            `${import.meta.env.VITE_BACKEND_HOST}/api/admin/posts/`,
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
        const newPost = response.data;
        setPost(newPost)
        navigate(`/admin/post/${newPost.id}`)

    } catch (err){
        setError(err.response.data.message); //muestro mensaje de error
    }

    }

    return (
      <div className={styles.postCreate}>
        <h1 className={styles.title}>Create Post</h1>
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.section}>
            <p><label htmlFor="image">Image:</label></p>
            <textarea type="text" id="image" name="image" value={valueImage} rows="5" cols="50" onChange={(e) => setValueImage(e.target.value)}/>
          </div>
          <div className={styles.section}>
            <p><label htmlFor="title">Title:</label></p>
            <input type="text" id="title" name="title" value={valueTitle} onChange={(e) => setValueTitle(e.target.value)}/>
          </div>
          <div className={styles.section}>
            <p><label htmlFor="text">Text:</label></p>
            <textarea type="text" id="text" name="text" value={valueText} rows="10" cols="50" onChange={(e) => setValueText(e.target.value)}/>
          </div>
          <button type="submit">Create</button>
        </form>
        <span className={styles.error}>{error}</span>
      </div>
    )
}

export default AdminPostCreate;