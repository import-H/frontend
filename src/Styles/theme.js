import styled from "styled-components";

// 기본 input
const Input = styled.input`
  width: 100%;
  height: 37px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  transition: border 0.3s;
  &:active,
  &:focus,
  &:focus-visible {
    border-color: #222;
  }
`;

//기본 버튼
const Button = styled.button`
  background-color: ${(props) => props.backgroundColor || "#ddd"};
  padding: 0 20px;
  color: #fff;
  min-height: 42px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s, border 0.3s;
  outline: none;
  /* & 문자를 사용하여 Sass 처럼 자기 자신 선택이 가능합니다. */
  &:hover {
    background-color: var(--point-color-yellow);
    color: #222;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  min-width: 300px;
  padding: 50px 0;  
`;

const FlexContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled(Container)`
  max-width: unset;
  margin-top: 0;
`;

export { Button, Input, Container, MainContainer };
