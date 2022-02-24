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
        <div id="log">
          <UserMenu />
        </div>
      </div>
      <Drawer
        title="Import-H"
        placement="left"
        onClose={onClose}
        visible={visible}
        id="mbNav"
      >
        <ul className="mbMenu">
          <li><Link to="/board/free" onClick={onClose}>게시판</Link></li>
          <li><Link to="/posts" onClick={onClose}>스터디 멤버</Link></li>
        </ul>
      </Drawer>
    </nav>
  );
}

export default NavBar;
