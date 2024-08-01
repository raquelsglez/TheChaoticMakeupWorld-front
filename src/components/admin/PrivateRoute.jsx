import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../../context/PostContext';
import { Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { admin } = usePostContext();
  const navigate = useNavigate(); // Inicializa el hook aquí

  useEffect(()=>{
    if (!admin.id) {
      navigate('/admin/login');
    }
  }, []);

  return admin.id ? <Outlet/> : null
};

export default AdminPrivateRoute;
