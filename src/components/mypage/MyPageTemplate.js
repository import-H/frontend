import React from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Profile from "./Profile";
import Setting from "./Setting";
import Scrap from "./Scrap";
import Like from "./Like";

const StyledModal = styled(Modal)`
  & .btnArea {
    display: flex;
    justify-content: flex-end;
    margin-top: 3em;

    & .linkBtn {
      font-size: 1.4rem;
      margin-right: 1.5rem;
      width: 50%;
      max-width: 120px;
      &:last-child {
        margin-right: 0;
      }
      &.cancel {
        background-color: #000;
      }
      &.cancel:hover {
        background-color: var(--point-color-orange);
        color: #fff;
      }
    }
  }
`;

const MyPageTemplate = ({
  onSubmit,
  onImageChange,
  onChange,
  user,
  userId,
  isChange,
  data,
}) => {
  return (
    <>
      <div>hi</div>
      {user?.nickname && (
        <>
          <h1 className="secTit">{user.nickname} 님 마이페이지</h1>
          <div className="cardWrap flex flex-jc-c">
            <Profile user={user} />

            <Setting
              user={user}
              isChange={isChange}
              data={data}
              onChange={onChange}
              onSubmit={onSubmit}
              onImageChange={onImageChange}
            />
          </div>
          <div className="cardWrap flex flex-jc-c">
            <Scrap userId={userId} />
            <Like userId={userId} />
          </div>
        </>
      )}
    </>
  );
};

export default MyPageTemplate;
