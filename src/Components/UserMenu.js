// react
import React, { useEffect } from "react";

// react-router-dom
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, reEmailAuth } from "../reducers/slices/authSlice";
// style
import styled from "styled-components";
import { Menu, Dropdown } from "antd";
import noneProfileImg from "../images/none_profile_image.png";
import { getMessages, getProfile } from "../reducers/slices/userSlice";
import Messages from "./Messages";

const AuthorImg = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: #ddd;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Caution = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  text-decoration: underline;
  &:hover {
    color: red;
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const menu = (pathId, roles) => (
  <Menu className="myMenu">
    <Menu.Item key="mypage">
      <Link to="/mypage" data-testid="profileLink">
        프로필
      </Link>
    </Menu.Item>

    <Menu.Item key="myBoard">
      <Link to={`/posts/${pathId}`} data-testid="profileLink">
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
      <Link to="" data-testid="profileLink">
        로그아웃
        {/* 로그아웃 아직 미구현 */}
      </Link>
    </Menu.Item>
  </Menu>
);

function UserMenu() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = useSelector(state => state.user.profile);
  const messages = useSelector(state => state.user.messages);

  const logoutBtn = () => {
    dispatch(logout());
  };

  const onEmailAuth = () => {
    // 인증 이메일 확인했는지

    alert(`${profile.email}로 인증 메일을 보냈습니다`);
    try {
      dispatch(reEmailAuth());
    } catch (e) {
      alert("error");
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      dispatch(getProfile(auth.userId));
      dispatch(getMessages());
    }
  }, []);
  return (
    <>
      {auth && (
        <span>
          {auth.isAuth ? (
            <span role="afterLogin" className="flex">
              {!(profile?.emailVerified || profile?.oauthId) && (
                <Caution className="element" onClick={onEmailAuth}>
                  ⚠ 이메일 인증을 진행해주세요
                </Caution>
              )}
              <div>
                <Dropdown
                  overlay={<Messages messages={messages} />}
                  placement="bottomCenter"
                >
                  <div>🔔</div>
                </Dropdown>
              </div>
              <div className="element hdProfileIcon">
                <Dropdown
                  overlay={menu(profile?.pathId, auth?.roles)}
                  placement="bottomCenter"
                >
                  <AuthorImg>
                    {profile?.profileImage ? (
                      <img src={profile?.profileImage} alt="profileImg" />
                    ) : (
                      <img src={noneProfileImg} />
                    )}
                  </AuthorImg>
                </Dropdown>
              </div>

              <div className="element">
                {/* Link 태그를 사용해야 링크로 인식해서 마우스를 올리면 클릭 표시가 뜸 */}
                <Link to="/" className="linkBtn" onClick={logoutBtn}>
                  로그아웃
                </Link>
              </div>
              {auth.roles === "ROLE_ADMIN" && (
                <div className="element">
                  <Link to="/admin" className="linkBtn">
                    관리자 페이지
                  </Link>
                </div>
              )}
            </span>
          ) : (
            <span role="beforeLogin">
              <div className="element">
                <Link to="/login" className="linkBtn">
                  로그인
                </Link>
              </div>
              <div className="element">
                <Link to="/register" className="linkBtn">
                  회원가입
                </Link>
              </div>
            </span>
          )}
        </span>
      )}
    </>
  );
}

export default UserMenu;
