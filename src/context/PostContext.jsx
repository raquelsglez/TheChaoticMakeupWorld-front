import { createContext, useState, useContext, useEffect } from 'react';

const PostContext = createContext();//crear contexto

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [isLoad, setIsLoad] = useState(false);


  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    if(userLocalStorage) {
      setUser(JSON.parse(userLocalStorage));
    }
    setIsLoad(true)
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, post, setPost, user, setUser }}>
      {isLoad ? children : <p>Loading...</p>}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
    return useContext(PostContext); //hook personalizado para usar el contexto de Post
}