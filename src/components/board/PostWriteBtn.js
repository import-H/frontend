import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

const PostWriteBtn = ({ boardId }) => {
  return (
    <Link
      to={{ pathname: `/write/${boardId}` }}
      className="writeBtn linkBtn black"
    >
      글 작성하기
    </Link>
  );
};

export default PostWriteBtn;
