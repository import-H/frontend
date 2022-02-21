// 전역 스타일 설정
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`    
   
    :root{
      --point-color-orange: #FF6C26;
      --point-color-yellow:#ffc90a;
      --point-color-red: #cc2418;
      --secondary-color: #7973ce;
      
    }
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        //color: black;
        list-style: none;
        text-decoration: none;
    }
    a{
      color: #333;
      &:hover{  
          color: var(--secondary-color)
        }
    }

    html, body{
        font-size: 10px; // 1rem = 10px
        font-family: 'Poppins', 'Noto Sans KR' , 'sans-serif';
        color: #333;
        background-color: #fefefe;

        @media (max-width: 1200px){
          font-size: 10px;
        }
    }
    input{
      font-size: 1.2rem;
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
        background-color: var(--secondary-color);       
        color: #fff;
        border-radius: 5px;
        transition: 0.3s;
        cursor: pointer;
        outline: none;
        border: none;

        &:hover{
          background-color: var(--point-color-yellow);  
          color: #222;
        }

        &.black{
          background: #000;
          color: #fff;

          &:hover{
            background: var( --point-color-orange);
          }
        }
    }

    .secTit{
      font-size: 2.8rem;
      font-family: "Noto Sans KR",sans-serif;
      font-weight: 500;
      text-align: center;
      width: 100%;
      margin-bottom: 3rem;
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
    transition:  all 0.3s;
    @media (max-width: 1200px){
      padding: 0 25px; 
    }
    @media (max-width: 768px){
      padding: 0 20px;
    }
  }
  header #logo a {
    flex-grow: 2;
    display: flex;
    align-items: center;
  }
  header #logo img{
    transition: all 0.3s;
    @media (max-width: 1200px){
      width: 100px;
      margin-top: 4px;
    }
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
    @media (max-width: 768px){
      flex-grow: 0;
    }
  }
  header #log .element {
    float: left;
    margin-right: 10px;
    @media (max-width: 768px){
      &:first-child{
        margin-right: 0;
      }
      &:not(:first-of-type){
        display: none;
      }
    }
  }
  header #log .element:last-child {
    margin-right: 0px;
  }

 

  
  header #navMenu {
    margin-left: 5rem;
    flex-grow: 4;  
    display: flex;
    transition: all 0.3s;
    

    & a{
      color: black;
      font-size: 1.4em;
      padding: 1rem 2rem;
      transition: all 0.3s;
      &:hover{
        color: var(--secondary-color);
      }
    }
    @media (max-width: 1200px){
      margin-left: 3rem;
    }
    @media (max-width: 768px){
      display: block;
      margin-left: 0;
     position: fixed;
     min-width: 320px;
     width: 80%;
     height: 100vh;
     z-index: 9999;
     top: 0;
     left: -100%;
     padding: 20px;
      transition: all 0.3s;
      background: #fff;
      box-shadow: 5px 0px 10px rgba(0,0,0,0.15);
      & a{
        display: block;
        padding: 10px 0;
        font-size: 1.7em;
        font-weight: 600;
      }
    }
  }


  /* mobile header */
 #menu-btn{
   display: none;
   @media(max-width: 768px){
     display: block;
     font-size: 2.4em;
     margin-top: 3px;
     cursor: pointer;
     color: #aaa;
   }
 }
  
`;

export default GlobalStyle;
