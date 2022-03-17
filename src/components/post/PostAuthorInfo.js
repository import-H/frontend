import React from "react";

// styled
import styled from "styled-components";

// etc
import noneProfileImg from "../../images/none_profile_image.png";

const Wrapper = styled.div`
  padding: 20px 0;

  & .authorName {
    font-size: 1.6em;
    margin-right: 10px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 1.4em;
    }
  }
`;

const AuthorImg = styled.div`
  width: 60px;
  height: 60px;
  background: #ddd;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const PostAuthorInfo = ({ nickname, profileImage }) => {
  return (
    <Wrapper className="flex flex-ai-c flex-jc-e">
      {/* 작성자 이름 */}

      <div className="authorName">{nickname}</div>
      {/* 프로필 이미지 */}
      <AuthorImg>
        {profileImage ? (
          <img src={profileImage} alt="profileImg" />
        ) : (
          <img src={noneProfileImg} />
        )}
      </AuthorImg>
    </Wrapper>
  );
};

export default PostAuthorInfo;
