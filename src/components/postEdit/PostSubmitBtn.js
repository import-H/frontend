import React from "react";

const PostSubmitBtn = ({ onPostSubmit }) => {
  return (
    <button className="linkBtn black" onClick={onPostSubmit}>
      작성 완료
    </button>
  );
};

export default PostSubmitBtn;
