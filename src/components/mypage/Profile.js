import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import noneProfileImg from "../../images/none_profile_image.png";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ user }) => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const [userIp, setUserIp] = useState("");

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(res => setUserIp(res.ip));
  }, []);

  return (
    <div className="card">
      <h3>
        <FontAwesomeIcon icon={faFaceSmile} /> 나의 프로필
      </h3>
      <div className="flex" style={{ paddingTop: "15px" }}>
        <div className="profileImgArea">
          {user.profileImage ? (
            <img src={user.profileImage} width="100" height="100" />
          ) : (
            <img src={noneProfileImg} width="100" height="100" />
          )}
        </div>
        <div style={{ flexGrow: 1 }}>
          <div className="nicknameArea flex flex-ai-c">
            <h1>{user.nickname}</h1>
          </div>
          <div className="introductionArea flex flex-ai-c">
            <h2>
              {user.introduction === "" || user.introduction === null
                ? "자기소개가 없습니다."
                : user.introduction}
            </h2>
          </div>
        </div>
        <div className="element">
          <span className="sub">접속 중인 IP</span>
          <span className="result">{userIp}</span>
        </div>
        <div className="element">
          <span className="sub">이메일</span>
          <span className="result">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
