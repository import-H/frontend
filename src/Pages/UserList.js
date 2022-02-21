import React, { useEffect } from "react";
import GlobalStyle from "../Styles/Globalstyle";
import { Container } from "../Styles/theme";
import styled from "styled-components";
import noneProfileImg from "../images/none_profile_image.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../reducers/slices/userSlice";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
`;

const User = styled.div`
  margin: 2rem;
  padding: 2rem;

  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 7px;
  padding: 1rem;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.07);

  & img {
    width: 4rem;
    border-radius: 7px;
    object-fit: cover;
    object-position: center;
  }

  .userName {
    padding: 1rem;
  }
`;

const sampleUsers = [
  {
    id: 1,
    username: "이상하게길게지은닉네임",
    userInfo: "안녕하세요 자몽입니다",
  },
  { id: 2, username: "Dever", userInfo: "안녕하세요 자몽1입니다" },
  { id: 3, username: "자몽입니다", userInfo: "안녕하세요 자몽2입니다" },
  { id: 4, username: "수근", userInfo: "안녕하세요 자몽3입니다" },
  { id: 5, username: "자몽4", userInfo: "안녕하세요 자몽4입니다" },
  { id: 6, username: "자몽5", userInfo: "안녕하세요 자몽5입니다" },
  { id: 7, username: "자몽6", userInfo: "안녕하세요 자몽6입니다" },
  { id: 8, username: "자몽7", userInfo: "안녕하세요 자몽7입니다" },
];

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <Container>
      <GlobalStyle />
      <Wrapper>
        {users &&
          users.map(user => (
            <Link to={`posts/${user?.pathId}`}>
              <User key={user.userId}>
                {user?.profileImage ? (
                  <img src={user.profileImage} />
                ) : (
                  <img src={noneProfileImg} />
                )}
                <div className="userName">{user.nickname}</div>
              </User>
            </Link>
          ))}
      </Wrapper>
    </Container>
  );
};

export default UserList;
