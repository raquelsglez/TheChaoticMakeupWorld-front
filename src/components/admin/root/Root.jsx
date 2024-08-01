import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css"
import { IoCreate } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { RiHomeHeartFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { usePostContext } from "../../../context/PostContext";


function RootAdmin() {
  const { admin, setAdmin } = usePostContext();
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate('/admin');
    return;
  };

  const handleClickCreate = () => {
    navigate('/admin/post/create');
    return;
  };

  const handleClickLogout = () => {
    setAdmin({}) //limpiar admin en el contexto al hacer logout
    localStorage.setItem('admin', JSON.stringify({}));
    navigate('/admin/login');
    return;
  };

  const handleClickCreateNewAdmin = () => {
    navigate('/admin/register');
    return;
  }

  if (!admin.id){
    return (
      <>
      <header className={styles.header}>
          <nav className={styles.navBar}>
            <ul>
              <li className={styles.sectionHome}>
                <p>THE CHAOTIC MAKEUP WORLD</p>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet/>
      </>
    );
  }

  return (
    <>
    <header className={styles.header}>
      <nav className={styles.navBarLogin}>
          <ul>
            <li className={styles.sectionHome}>
              <RiHomeHeartFill onClick={handleClickHome} className={styles.homeIcon} size={35}/>
              <Link to="/admin">THE CHAOTIC MAKEUP WORLD</Link>
            </li>
            <li>
              <div className={styles.sectionActions}>
                <div className={styles.sectionCreate}>
                  <div className={styles.createIcon} onClick={handleClickCreateNewAdmin}>
                    <IoCreate/>
                    <p>Create new admin</p>
                  </div> 
                  <div className={styles.createIcon} onClick={handleClickCreate}>
                    <IoCreate/>
                    <p>Create post</p>
                  </div> 
                </div>
                <div className={styles.logoutIcon} onClick={handleClickLogout}>
                    <CiLogout />
                    <p>Logout</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet/>
    </>
  );
}

export default RootAdmin;
