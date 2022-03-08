import React from "react";
import styled from "styled-components";
import { Setting, BannerArea, Content } from "../../pages/Admin";

const ImgInput = styled.input`
  position: relative;
  bottom: -0.5rem;
  left: 0rem;
`;

const AddBanner = ({
  presentBanner,
  onImageChage,
  onChangeElement,
  onRemoveTag,
  onTagPush,
  onAddBanner,
}) => {
  return (
    <Setting>
      <BannerArea>
        <div className="BannerSetting">
          <div>
            <img
              className="img-box"
              src={presentBanner.imgUrl}
              alt="썸네일 이미지"
            />
            <ImgInput
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              name="imgUrl"
              onChange={onImageChage}
            />
          </div>
          <Content>
            <input
              className="title"
              placeholder="title"
              type="text"
              name="title"
              onChange={onChangeElement}
            />

            <textarea
              className="explain-input"
              placeholder="content"
              type="text"
              name="content"
              onChange={onChangeElement}
            />
            <div className="tags-input">
              {tags.map((tag, id) => (
                <div
                  onClick={() => {
                    onRemoveTag(tags);
                  }}
                >
                  {tag}
                </div>
              ))}
              <input
                placeholder="tags"
                onChange={e => setCurrentTag(e.target.value)}
                value={currentTag}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    onTagPush();
                  }
                }}
              />
            </div>

            <input
              placeholder="url"
              type="text"
              name="url"
              onChange={onChangeElement}
            />
          </Content>
        </div>
      </BannerArea>
      <button onClick={onAddBanner}>+</button>
    </Setting>
  );
};

export default AddBanner;
