// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// component
import Sidebar from "./Sidebar";
import UserMenuC from "../../containters/navbar/UserMenuC";

// image
import logoImg from "../../images/logo.png";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function NavBar({ visible, onChangeDrawer, auth }) {
  return (
    <nav>
      <div id="content">
        <div id="menu-btn" onClick={onChangeDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div id="logo">
          <Link to="/">
            <img src={logoImg} alt="import-H" />
          </Link>
        </div>
        <div id="navMenu">
          <Link to="/board/free">게시판</Link>
          <Link to="/users">스터디 멤버</Link>
        </div>
        <div id="log">
          <UserMenuC auth={auth} />
        </div>
      </div>
      <Sidebar visible={visible} onChangeDrawer={onChangeDrawer} />
    </nav>
  );
}

export default NavBar;
