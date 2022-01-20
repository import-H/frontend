import React from "react";

// api가 아직 정해지지 않아 임시로 samplePosts 만들어둠
const samplePosts = [
  {
    id: 1,
    title: "프로그래밍 스터디 이름",
    text: "프로그래밍 스터디 이름은 import_H입니다.!!",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽"
  },
  {
    id: 2,
    title: "프로그래밍 스터디 이름",
    text: "프로그래밍 스터디 이름은 import_H입니다.!!",
    thumbnail: "",
    create_at: "2022-01-21",
    author: "자몽"
  }
];

const Board = () => {
  return (
    <div>
      {samplePosts.map((post) => (
        <div style={{ border: "1px solid black", padding: 20, margin: 20 }}>
          <div>{post.title}</div>
          <div>{post.text}</div>
          <div>{post.author}</div>
        </div>
      ))}
    </div>
  );
};

export default Board;
