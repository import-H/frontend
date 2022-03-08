import React from "react";
import { Drawer } from "antd";
import { Link } from "react-router-dom";

const Sidebar = ({ visible, onChangeDrawer }) => {
  return (
    <Drawer
      title="Import-H"
      placement="left"
      onClose={onChangeDrawer}
      visible={visible}
      id="mbNav"
    >
      <ul className="mbMenu">
        <li>
          <Link to="/board/free" onClick={onChangeDrawer}>
            게시판
          </Link>
        </li>
        <li>
          <Link to="/posts" onClick={onChangeDrawer}>
            스터디 멤버
          </Link>
        </li>
      </ul>
    </Drawer>
  );
};

export default Sidebar;
