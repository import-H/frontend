import React from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { logout, reEmailAuth } from "../../redux/slices/authSlice";
import { checkMessage } from "../../redux/slices/userSlice";

// components
import UserMenu from "../../components/navbar/UserMenu";

const UserMenuC = ({ auth }) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  const messages = useSelector(state => state.user.messages);

  // 로그아웃
  const onLogout = () => {
    dispatch(logout());
  };

  // 이메일 재인증하기
  const onEmailAuth = () => {
    alert(`${profile.email}로 인증 메일을 보냈습니다`);
    try {
      dispatch(reEmailAuth());
    } catch (e) {
      alert("error");
    }
  };

  // 메세지(알람) 클릭
  const onClickMessage = async id => {
    try {
      const res = await dispatch(checkMessage(id)).unwrap();
      const [msgType, msgId] = res.split("/");
      switch (msgType) {
        // 자유, 질문, 공지 게시판
        case "free":
        case "questions":
        case "notice":
          navigate(`/board/${msgType}/${msgId}`);
          break;
        // 개인 게시판
        default:
          navigate(`/users/${msgId}`);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <UserMenu
      auth={auth}
      profile={profile}
      messages={messages}
      onLogout={onLogout}
      onEmailAuth={onEmailAuth}
      onClickMessage={onClickMessage}
    />
  );
};

export default UserMenuC;
