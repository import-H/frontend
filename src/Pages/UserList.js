import React from "react";
import GlobalStyle from "../Styles/Globalstyle";
import { Container } from "../Styles/theme";

const sampleUsers = [
  { id: 1, username: "자몽", userInfo: "안녕하세요 자몽입니다" },
  { id: 2, username: "자몽1", userInfo: "안녕하세요 자몽1입니다" },
  { id: 3, username: "자몽2", userInfo: "안녕하세요 자몽2입니다" },
  { id: 4, username: "자몽3", userInfo: "안녕하세요 자몽3입니다" },
  { id: 5, username: "자몽4", userInfo: "안녕하세요 자몽4입니다" },
  { id: 6, username: "자몽5", userInfo: "안녕하세요 자몽5입니다" },
  { id: 7, username: "자몽6", userInfo: "안녕하세요 자몽6입니다" },
  { id: 8, username: "자몽7", userInfo: "안녕하세요 자몽7입니다" },
];

const UserList = () => {
  return (
    <Container>
      <GlobalStyle />
      <div>
        {sampleUsers.map(user => (
          <div key={user.id}>
            <div>{user.username}</div>
            <div>{user.userInfo}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserList;
