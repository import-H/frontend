import React from "react";
import GlobalStyle from "../styles/Globalstyle";
import { Container } from "../styles/theme";
import styled from "styled-components";
import AdminC from "../containters/admin/AdminC";

const AdminContainer = styled(Container)`
  & .sec-tit {
    font-size: 2.8rem;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 500;
  }
`;

export const Setting = styled.div`
  display: flex;
  flex-direction: row;

  & button {
    background: none;
    outline: none;
    border: 2px solid rgba(255, 255, 255, 0.9);
    border-radius: 5px;
    margin: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 2rem;
    padding: 1.3rem;
    cursor: pointer;
    &:hover {
      border: 2px solid rgba(255, 255, 255, 0.7);
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const BannerArea = styled.div`
  width: 100%;
  background: white;
  border-radius: 7px;
  padding: 1.5rem;
  display: block;
  margin: 1rem;
  & .BannerSetting {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    & .img-box {
      width: 360px;
      height: 200px;
      overflow: hidden;
      border-radius: 7px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

const Slice = styled.div`
  width: 100%;
  background: rgb(140, 131, 255);
  background: linear-gradient(
    45deg,
    rgba(140, 131, 255, 1) 0%,
    rgba(50, 169, 140, 1) 100%
  );
  border-radius: 7px;
  padding: 2rem;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1.5rem;
  position: relative;
  top: -1rem;

  input {
    padding: 5px 7px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  textarea {
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  & .title {
    //color: #ffc90a;
    font-size: 2rem;
    font-weight: 500;
  }

  & .explain {
    //color: white;
    font-size: 1.4rem;
    margin: 1.6rem 0;
    margin-bottom: 3rem;
  }

  & .explain-input {
    font-size: 1.4rem;
    margin: 1.6rem 0;
    margin-bottom: 3rem;
    resize: none;
    height: 5rem;
    padding: 5px 7px;
  }

  & .author {
    margin-top: 1rem;
    font-size: 1.4rem;
    color: #808080;
    display: flex;
    justify-content: right;
  }
  & .tags-input {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;

    div {
      color: white;
      background: #ccc;
      font-size: 1.3rem;
      padding: 0.3rem 1rem;
      margin-right: 1rem;

      border-radius: 7px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  & .tags {
    display: flex;
    flex-direction: row;

    div {
      color: white;
      background: #ccc;
      font-size: 1.3rem;
      padding: 0.3rem 1rem;
      margin-left: 1rem;
      border-radius: 7px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

const Admin = () => {
  return (
    <AdminContainer>
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div className="sec-tit">관리자 페이지</div>

        <Slice>
          <AdminC />
        </Slice>
      </div>
    </AdminContainer>
  );
};

export default Admin;
