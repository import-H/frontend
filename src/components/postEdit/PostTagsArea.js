import React from "react";

// components
import TagInput from "./TagInput";
import TagList from "./TagList";

const PostTagsArea = ({
  onCurTagChange,
  currentTag,
  onTagPush,
  onTagDelete,
  tags,
}) => {
  return (
    <div className="tagCon">
      <TagInput
        onCurTagChange={onCurTagChange}
        currentTag={currentTag}
        onTagPush={onTagPush}
      />

      {/* 태그 목록 */}
      <TagList tags={tags} onTagDelete={onTagDelete} />
    </div>
  );
};

export default PostTagsArea;
