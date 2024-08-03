import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css"
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { usePostContext } from "../../../context/PostContext";
import { RiHomeHeartFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";


function Root() {
  const { user } = usePostContext(); //contexto para obtener user
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/');
    return;
  };

  const handleClickProfile = () => {
    navigate('/profile');
    return;
  };

  const handleClickEmail = () => {
    window.location.href = 'mailto:raquelsglez99@gmail.com';
  };

  const handleClickPhone = () => {
    window.location.href = 'tel:+647218455';
  };


  return (
    <>
    <header className={styles.header}>
        <nav className={styles.navBar}>
          <ul>
            <li>
              <RiHomeHeartFill onClick={handleClickHome} className={styles.homeIcon} size={35}/>
            </li>
            <li>
              <Link to="/">THE CHAOTIC MAKEUP WORLD</Link>
            </li>
            <li>
              <div onClick={handleClickProfile} className={styles.profileIcon}>
                <FaUser/>
                <p>{user.username}</p>
              </div> 
            </li>
          </ul>
        </nav>
      </header>
      <Outlet/>
      <footer className={styles.footer}>
        <div className={styles.sectionPhone} onClick={handleClickPhone}>
          <FaPhone className={styles.phoneIcon} size={15}/>
          <p>647218455</p>
        </div>
        <div className={styles.sectionEmail} onClick={handleClickEmail}>
          <MdEmail className={styles.emailIcon} size={15}/>
          <p>raquelsglez99@gmail.com</p>
        </div>
        <p>Copyright  © 2024 | All rights reserved</p>
      </footer>
    </>
  );
}

export default Root;
