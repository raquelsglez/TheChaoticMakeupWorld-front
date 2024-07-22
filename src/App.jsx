import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from './components/Root';
import { PostProvider } from './context/PostContext'
import PostList from "./components/post/PostList/PostList";
import PostDetail from "./components/post/PostDetail/PostDetail";

function App() {
  return (
    <PostProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Root />} >
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Route>
          </Routes>
      </Router>
    </PostProvider>
  )
}

export default App;
