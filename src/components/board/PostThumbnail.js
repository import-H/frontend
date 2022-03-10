import React from "react";

// config
import { API_URL } from "../../config";

// style
import styled from "styled-components";

const ImgArea = styled.div`
  margin-right: 1rem;
  flex: 1;
  height: 12rem;
  width: 25rem;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const PostThumbnail = ({ post }) => {
  return (
    <ImgArea>
      <img src={`${API_URL}/v1/file/upload/${post.thumbnail}`} />
    </ImgArea>
  );
};

export default PostThumbnail;
