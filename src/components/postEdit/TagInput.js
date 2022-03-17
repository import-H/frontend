import React from "react";

// style
import styled from "styled-components";
import { Input } from "../../styles/theme";

const TagInputWrapper = styled(Input)`
  width: 100%;
  flex-shrink: 0;
`;

const TagInput = ({ onCurTagChange, currentTag, onTagPush }) => {
  return (
    <TagInputWrapper
      className="tagsInput"
      placeholder="Tags"
      onChange={onCurTagChange}
      value={currentTag}
      onKeyPress={e => {
        if (e.key === "Enter") {
          onTagPush();
        }
      }}
    />
  );
};

export default TagInput;
