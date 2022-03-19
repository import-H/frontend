import React from "react";

// redux
import { useDispatch } from "react-redux";

// style
import styled from "styled-components";
import { Menu } from "antd";


const StyledMenu = styled(Menu)`
   text-align: center;
  border-radius: 0.4rem;
  position: relative;
  margin-top: 2rem;
  box-shadow: 0px 5px 10px rgb(0 0 0 / 5%) !important;
  border: 1px solid #dcdcdc;

  &::after{
    /* 말풍선 모양 장식 */
    content: "";
    position: absolute;
    display: block;
    bottom: 100%;    
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-bottom: 1.5rem solid #fff;
    border-top: 1rem solid transparent;
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
  }
  &::before{
    content: "";
    position: absolute;
    display: block;
    bottom: 100%;    
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-bottom: 1.6rem solid #dcdcdc;
    border-top: 1.1rem solid transparent;
    border-left: 1.1rem solid transparent;
    border-right: 1.1rem solid transparent;
  }

  & li{
    margin: 0 !important;
    border-radius: 0.4rem;

    &.ant-menu-item-selected{
      background-color: #7973ce20 !important;
    }

    &.ant-menu-item-selected a{
      color: var(--secondary-color);
    }

    &:active{
      background-color: #7973ce20;
    }
  }
   
  & a{
     font-size: 1.3rem;
     min-width: 200px;
     display: block;

     &:hover, &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
       color: var(--secondary-color);
     }
   }
`;

const Messages = ({ messages, onClickMessage }) => {
  console.log(messages);

  

  return (
    <StyledMenu>
      {messages &&
        messages.map(message => (
          <StyledMenu.Item
            key={message.id}
            onClick={() => {
              onClickMessage(message.id);
            }}
          >
            <div>{message.title}</div>
            <div>{message.createdAt}</div>
          </StyledMenu.Item>
        ))}
    </StyledMenu>
  );
};

export default Messages;
