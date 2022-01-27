import React from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div id="content">
        <div id="logo">
          <Link to="/" style={{ padding: "1rem" }}>
            <img src="images/logo.png" alt="import-H" />
          </Link>
        </div>
        <div id="navMenu">
          <Link to="/board" style={{ padding: "1rem" }}>
            게시판
          </Link>
        </div>
        <div id="log">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
