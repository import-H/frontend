import React from "react";
import { Menu, Dropdown } from "antd";
import { Link } from "react-router-dom";

const UserMenuList = props => {
  const { pathId, roles, onLogout } = props;
  return (
    <Menu className="myMenu">
      <Menu.Item key="mypage">
        <Link to="/mypage" data-testid="profileLink">
          프로필
        </Link>
      </Menu.Item>

      <Menu.Item key="myBoard">
        <Link to={`/users/${pathId}`} data-testid="profileLink">
          내 게시판
        </Link>
      </Menu.Item>

      {roles === "ROLE_ADMIN" && (
        <Menu.Item className="mb" key="admin">
          <Link to="/admin" data-testid="profileLink">
            관리자 페이지
          </Link>
        </Menu.Item>
      )}
      <Menu.Item className="mb" key="logout">
        <Link to="" data-testid="profileLink" onClick={onLogout}>
          로그아웃
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default UserMenuList;
