import { createContext, useState, useContext } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});


  return (
    <PostContext.Provider value={{ posts, setPosts, post, setPost, user, setUser }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
    return useContext(PostContext);
}