import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Input } from "antd";
import styled from "styled-components";

const ImgInput = styled.input`
  position: relative;
  bottom: -0.5rem;
  left: 0rem;
`;

const settingDatas = [
  { name: "nickname", label: "이름" },
  { name: "introduction", label: "자기소개" },
  { name: "personalUrl", label: "웹사이트" },
];

const Setting = ({
  user,
  isChange,
  data,
  onChange,
  onSubmit,
  onImageChange,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card" id="infoArea">
      <h3>
        <FontAwesomeIcon icon={faGear} /> 설정
      </h3>

      {settingDatas.map(settingData => (
        <div key={settingData.name}>
          <label>
            {settingData.label}
            {isChange ? (
              <Input
                value={data[settingData.name]}
                name={settingData.name}
                onChange={onChange}
              />
            ) : (
              user.nickname
            )}
          </label>
        </div>
      ))}

      <div>프로필 이미지</div>
      {isChange && (
        <div>
          <img src={data.profileImage} alt="프로필 이미지" />
          {showModal && (
            <ImgInput
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              name="imgUrl"
              onChange={onImageChange}
            />
          )}
          <button
            className="linkBtn"
            onClick={() => {
              setShowModal(true);
            }}
          >
            변경
          </button>
          <button className="linkBtn" name="profileImage" onClick={onChange}>
            삭제
          </button>
        </div>
      )}

      <div className="linkBtn" onClick={onSubmit}>
        설정 변경
      </div>

      <div className="leaveBtnArea flex flex-jc-e">
        {user.oauthId ? (
          <>
            <Link to="/leave/auth" className="linkBtn">
              회원 탈퇴
            </Link>
          </>
        ) : (
          <>
            <Link to="/changepw" className="linkBtn">
              비밀번호 변경
            </Link>
            <Link to="/leave/oauth" className="linkBtn">
              회원 탈퇴
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Setting;
