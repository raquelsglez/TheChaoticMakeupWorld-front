import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css"
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { usePostContext } from "../context/PostContext";


function Root() {
  const { user } = usePostContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if(user.username){
      navigate('/profile');
      return;
    }
    navigate('/login');
    return;
  };

  return (
    <>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="/">THE CHAOTIC MAKEUP WORLD</Link>
          </li>
        </ul>
        <div onClick={handleClick} className={styles.profileIcon}>
          <FaUser/>
          <p>{user.username}</p>
        </div> 
      </nav>
      <Outlet/>
    </>
  );
}

export default Root;
