import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css"


function Root() {
  return (
    <>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <Link to="/">THE CHAOTIC MAKEUP WORLD</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}

export default Root;
