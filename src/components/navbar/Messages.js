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
    font-size: 1.3rem;
     min-width: 240px;
     display: block;    
    &.ant-menu-item-selected{
      background-color: #FF6C2620 !important;
    }
    &.ant-menu-item-selected a{
      color: var(--point-color-orange);
    }
    &:hover,&.ant-menu-item-selected, &.ant-menu:not(.ant-menu-horizontal){
      color: var(--point-color-orange) !important;
    }
    &:active{
      background-color: #FF6C2620;
    } 
    & .ant-menu-title-content{
      & .red-dot{
        /* red dot */
        display: inline-block;   
        margin-right: 1rem;     
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 100%;
        background: var(--point-color-orange);        
      }
      }
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
            <div className="flex flex-ai-c">
              <span class="red-dot"/>
              {message.title}
            </div>
            <div>{message.createdAt}</div>
          </StyledMenu.Item>
        ))}
    </StyledMenu>
  );
};

export default Messages;
