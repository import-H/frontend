// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// component
import UserMenu from "./UserMenu";

// image
import logoImg from "../images/logo.png";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <nav>
      <div id="content">
        <div id="menu-btn">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div id="logo">
          <Link to="/">
            <img src={logoImg} alt="import-H" />
          </Link>
        </div>
        <div id="navMenu">
          <Link to="/board/free">게시판</Link>
          <Link to="/posts">개인활동 게시판</Link>
        </div>
        <div id="log">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
