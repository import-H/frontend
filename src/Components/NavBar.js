// react
import React, { useState } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// component
import UserMenu from "./UserMenu";

// image
import logoImg from "../images/logo.png";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// style
import { Drawer } from "antd";

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav>
      <div id="content">
        <div id="menu-btn" onClick={showDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div id="logo">
          <Link to="/">
            <img src={logoImg} alt="import-H" />
          </Link>
        </div>
        <div id="navMenu">
          <Link to="/board/free">게시판</Link>
          <Link to="/posts">스터디 멤버</Link>
        </div>
        <div id="log">
          <UserMenu />
        </div>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        visible={visible}
      >
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Drawer>
    </nav>
  );
}

export default NavBar;
