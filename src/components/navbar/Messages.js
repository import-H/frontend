import React from "react";

// redux
import { useDispatch } from "react-redux";

// style
import { Menu } from "antd";

const Messages = ({ messages, onClickMessage }) => {
  console.log(messages);

  return (
    <Menu>
      {messages &&
        messages.map(message => (
          <Menu.Item
            key={message.id}
            onClick={() => {
              onClickMessage(message.id);
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
