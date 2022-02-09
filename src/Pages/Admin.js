import React, { useState } from "react";
import GlobalStyle from "../Styles/Globalstyle";
import { Container } from "../Styles/theme";
import styled from "styled-components";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <Container>
      <GlobalStyle />
      {/* banner 수정 */}
      <div>
        <label>title</label>
        <input
          type="text"
          name="email"
          onChange={e => setTitle(e.target.value)}
        />
        <label>tags</label>
        {/* tagArea/ */}
        <div>
          {tags.map((tag, id) => (
            <div
              onClick={() => {
                setTags(tags.filter(t => t !== tag));
              }}
            >
              {tag}
            </div>
          ))}
          <input
            onChange={e => setCurrentTag(e.target.value)}
            value={currentTag}
            onKeyPress={e => {
              if (e.key === "Enter") {
                onTagPush();
              }
            }}
          />
        </div>
        <label>content</label>
        <input
          type="text"
          name="email"
          onChange={e => setTitle(e.target.value)}
        />
      </div>
    </Container>
  );
};

export default Admin;
