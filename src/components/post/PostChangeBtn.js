import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

const PostChangeBtn = ({ boardId, postId, onDeletePost }) => {
  return (
    <div className="btnWrap flex flex-jc-e">
      <Link
        className="linkBtn black"
        to={{ pathname: `/edit/${boardId}/${postId}` }}
      >
        수정
      </Link>
      <div className="linkBtn black" onClick={onDeletePost}>
        삭제
      </div>
    </div>
  );
};

export default PostChangeBtn;
