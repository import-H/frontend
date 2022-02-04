// 전역 스타일 설정
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    // font import
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
   
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        color: inherit;
        list-style: none;
        text-decoration: none;
    }
    html, body{
        font-size: 10px; // 1rem = 10px
        font-family: 'Poppins', 'Noto Sans KR' , 'sans-serif';
        color: #333;
        background-color: #fefefe;
    }

    /* lib */

    .flex {
        display: flex;
    }

    .flex-d-c {
        flex-direction: column;
    }

    .flex-jc-c {
        justify-content: center;
    }

    .flex-jc-b{
      justify-content: space-between;
    }

    .flex-jc-e{
      justify-content: flex-end;
    }

    .flex-ai-c {
        align-items: center;
    }

    .linkBtn {
        display: block;
        min-width: 72px;
        padding: 7px 15px;
        text-align: center;
        font-size: 1.1em;
        background-color: #7973ce;       
        color: #fff;
        border-radius: 5px;
        transition: 0.3s;

        &:hover{
          background-color: #ffc90a;  
          color: #222;
        }

        &.black{
          background: #000;
          color: #fff;

          &:hover{
            background: #FF6C26;
          }
        }
    }

    /* NavBar */
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    height: 50px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
    z-index: 999;
  }
  header nav {
    width: 100%;
    height: 100%;
  }
  header #content {
    width: 100%;
    height: 100%;
    padding: 0 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  header #logo a {
    flex-grow: 2;
    display: flex;
    align-items: center;
  }
  header #logo a,
  header #log a,
  .inner a {
    text-decoration: none;
  }
  header #log {
    flex-grow: 1;
    display: flex;
    justify-content: right;
  }
  header #log .element {
    float: left;
  }
  header #log .element:first-child {
    margin-right: 10px;
  }

 

  
  header #navMenu {
    margin-left: 5rem;
    flex-grow: 4;
  
    display: flex;
  }
  
  header #navMenu a {
    font-size: 1.4em;
    padding: 1rem 2rem;
    transition: all 0.3s;
  }

  header #navMenu a:hover{
    color: #7973ce;
  }
`;

export default GlobalStyle;
