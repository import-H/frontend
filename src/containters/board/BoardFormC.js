// react
import React, { useEffect, useState } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";

// react-router-dom
import { Link, useParams } from "react-router-dom";

// toast-ui viewer
import { Viewer } from "@toast-ui/react-editor";
import BoardForm from "../../components/board/BoardForm";
import { getPosts } from "../../redux/slices/postSlice";

const BoardFormC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const isAuth = useSelector(state => state.auth.isAuth);
  const boardId = useParams().id;

  // 게시글 목록에서 게시글 formatting
  const simplyContent = content => {
    if (content.length >= 100) content = content.slice(0, 100) + "...";

    const regex = /!\[Image\]\([\w\/:]+\)/;
    let imgStr;
    while ((imgStr = content.match(regex)) !== null) {
      content = content.replace(imgStr[0], "");
    }
    content = content
      .replaceAll("#", "")
      .replaceAll("*", "")
      .replaceAll("\n", "");

    return content;
  };

  useEffect(async () => {
    await dispatch(getPosts(boardId));
  }, [boardId]);
  return (
    <BoardForm
      posts={posts}
      boardId={boardId}
      isAuth={isAuth}
      simplyContent={simplyContent}
    />
  );
};

export default BoardFormC;
