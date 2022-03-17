import React from "react";

const TagList = ({ tags, onTagDelete }) => {
  return (
    <div className="tagArea flex flex-ai-c">
      {tags &&
        tags.map((tag, id) => (
          <div
            key={tag}
            className="postTag"
            onClick={() => {
              onTagDelete(tags, tag);
            }}
          >
            {tag}
          </div>
        ))}
    </div>
  );
};

export default TagList;
