import React from "react";
import { Menu, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkMessage } from "../reducers/slices/userSlice";

const Messages = ({ messages }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(messages);

  const onMessageClick = async id => {
    try {
      const res = await dispatch(checkMessage(id)).unwrap();
      const [msgType, msgId] = res.split("/");
      switch (msgType) {
        // 자유, 질문, 공지 게시판
        case "free":
        case "questions":
        case "notice":
          navigate(`/board/${msgType}/${msgId}`);
          break;
        // 개인 게시판
        default:
          navigate(`/users/${msgId}`);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Menu>
      {messages &&
        messages.map(message => (
          <Menu.Item
            key={message.id}
            onClick={() => {
              onMessageClick(message.id);
            }}
          >
            <div>{message.title}</div>
            <div>{message.createdAt}</div>
          </Menu.Item>
        ))}
    </Menu>
  );
};

export default Messages;
