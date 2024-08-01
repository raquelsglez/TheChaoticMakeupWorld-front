import { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PostContext = createContext();//crear contexto

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [isLoad, setIsLoad] = useState(false);
  const location = useLocation();


  useEffect(() => {

    if (location.pathname.includes('admin')){
      const adminLocalStorage = localStorage.getItem('admin');
      if(adminLocalStorage) {
        setAdmin(JSON.parse(adminLocalStorage));
      }

    }else{
      const userLocalStorage = localStorage.getItem('user');
      if(userLocalStorage) {
        setUser(JSON.parse(userLocalStorage));
      }
    }

    setIsLoad(true)
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, post, setPost, user, setUser, admin, setAdmin }}>
      {isLoad ? children : <p>Loading...</p>}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
    return useContext(PostContext); //hook personalizado para usar el contexto de Post
}