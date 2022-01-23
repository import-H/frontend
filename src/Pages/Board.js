import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../reducers/slices/postSlice";
// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠
const samplePosts = [
  {
    id: 1,
    title: "프로그래밍 스터디 이름",
    content: "프로그래밍 스터디 이름은 import_H입니다.!!",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽"
  },
  {
    id: 2,
    title: "프로그래밍 스터디 이름",
    content: "프로그래밍 스터디 이름은 import_H입니다.!!",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽"
  }
];

const Board = () => {
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.post.nickname);

  const userBtn = () => {
    dispatch(getUser());
  };
  return (
    <div>
      <div>
        user nickname: <b>{nickname}</b>
      </div>
      <button onClick={userBtn}>유저 정보 조회</button>
      {/* {samplePosts.map((post) => (
        <div style={{ border: "1px solid black", padding: 20, margin: 20 }}>
          <div>제목: {post.title}</div>
          <div>내용: {post.content}</div>
          <div>만든이: {post.author}</div>
        </div>
      ))} */}
    </div>
  );
};

export default Board;
