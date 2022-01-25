import React from "react";
import UserMenu from "./UserMenu";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div id="content">
        <span id="logo">
          <h1>
            <Link to="/" style={{ padding: "1rem" }}>
              <img src="images/logo.png" alt="import-H" />
            </Link>
          </h1>
        </span>
        <div id="log">
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
