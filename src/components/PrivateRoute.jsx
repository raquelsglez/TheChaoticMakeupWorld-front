import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = usePostContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user.id) {
      navigate('/login');
    }
  }, []);

  return user.id ? <Outlet/> : null
};

export default PrivateRoute;
