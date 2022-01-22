import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid black" }}>
      <Link to="/main" style={{ padding: "1rem" }}>
        메인
      </Link>
      <Link to="/register" style={{ padding: "1rem" }}>
        회원가입
      </Link>
      <Link to="/login" style={{ padding: "1rem" }}>
        로그인
      </Link>
    </div>
  );
};

export default Header;
