import React from "react";

// style
import { Input } from "../../styles/theme";

const PostTitleInput = ({ onTitleChange }) => {
  return (
    <Input
      type="text"
      name="email"
      onChange={onTitleChange}
      placeholder="Title"
    />
  );
};

export default PostTitleInput;
