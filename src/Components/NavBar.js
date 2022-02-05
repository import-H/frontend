// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// component
import UserMenu from "./UserMenu";

// image
import logoImg from "../images/logo.png";

function NavBar() {
  return (
    <nav>
      <div id="content">
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
