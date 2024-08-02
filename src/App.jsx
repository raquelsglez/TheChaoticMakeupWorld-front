import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Root from './components/user/root/Root';
import { PostProvider } from './context/PostContext'
import PostList from "./components/user/post/PostList/PostList";
import PostDetail from "./components/user/post/PostDetail/PostDetail";
import PrivateRoute from "./components/user/PrivateRoute";
import PostFavorites from "./components/user/post/PostFavorites/PostFavorites";
import Register from './components/user/auth/Register/Register';
import Login from './components/user/auth/Login/Login';
import Profile from "./components/user/Profile/Profile";
import RootAdmin from "./components/admin/root/Root";
import AdminLogin from "./components/admin/auth/Login/Login";
import AdminPostList from "./components/admin/post/PostList/PostList";
import AdminPostDetail from "./components/admin/post/PostDetail/PostDetail";
import AdminPostEdit from "./components/admin/post/PostEdit/PostEdit";
import AdminPostCreate from "./components/admin/post/PostCreate/PostCreate";
import AdminPrivateRoute from "./components/admin/PrivateRoute"; 
import AdminRegister from "./components/admin/auth/Register/Register";


function App() {
  return (
      <Router>
        <PostProvider>
          <Routes>
            <Route path="/" element={<Root />} >
              <Route index element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute/>}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<PostFavorites />} />
              </Route>

            </Route>
            <Route path="/admin" element={<RootAdmin />}>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<AdminPrivateRoute/>}>
                <Route index element={<AdminPostList />} />
                <Route path="/admin/post/:id" element={<AdminPostDetail />} />
                <Route path="/admin/post/:id/edit" element={<AdminPostEdit />} />
                <Route path="/admin/post/create" element={<AdminPostCreate />} />
                <Route path="/admin/register" element={<AdminRegister />} />
              </Route>
            </Route>
          </Routes>
        </PostProvider>
      </Router>
  )
}

export default App;
