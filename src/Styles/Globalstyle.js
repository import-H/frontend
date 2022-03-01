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
    html{position: relative;}
    body{
      position: relative;
      padding-bottom: 150px;
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
    //transition:  all 0.3s;
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
      &.hdProfileIcon{
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

  footer {
    width: 100%;
    bottom: 0;
    padding: 30px 0;
    padding-bottom: 40px;
    min-height: 150px;
    text-align: center;
    background-color: #ddd;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #copy {
      font-size: 1.2em;
      color: rgba(0,0,0,0.5);
    }
    #ft-logo{
      margin-top: 1em;
      margin-bottom: 2em;
      opacity: 1;
      & img{
        width: 120px;
      }
    }
    #menu {
      margin-bottom: 0.7em;
      font-size: 1.4em;

      span {
        margin-right: 1.3em;
        &:last-of-type{
          margin-right: 0;
        }
        & svg{
          margin-right: 0.5em;
        }
      }
      a {
        color: #555;
      }
    }
  }

 .myMenu{
  text-align: center;
   & a{
     padding: 5px 10px;
     font-size: 1.3rem;
   }
    & .mb{
      display:none;
      @media (max-width: 768px){
        display: block;
      }
    }
    
  }

  /* mobile header */
 #menu-btn{
   display: none;
   @media(max-width: 768px){
     display: block;
     font-size: 1.8em;
     margin-top: 3px;
     cursor: pointer;
     color: #aaa;
   }
 }

 #mbNav{

   & .mbMenu{
     & li {  
       
        & a{
          display: block;
          padding:0.7em 0;
          transition: all 0.4s;   
          position: relative;  
          
          &::before{
          content: "-";
          display: black;
          position: absolute;
          top: 50%;
          left: -5px;
          transform: translateY(-50%);
          color: var(--secondary-color);
          transition: all 0.4s;
          opacity: 0;           
         }
         &:hover{       
              padding-left: 20px;        
            &::before{
              left: 0;
              width: 100%;
              opacity: 1;
            }
          }
       }
     
       
     }
   }
   & .ant-drawer-content-wrapper{
     transition-duration: 0.4s;
    @media(max-width: 500px){
      max-width: 378px;
      min-width: 260px;
      width: 80% !important;
    }
   }
   & .ant-drawer-header{
     border-bottom: 1px solid #ddd;
     justify-content: space-between;
     & .ant-drawer-close{order: 1; margin-right: 0;}
     & .ant-drawer-title{
       flex-grow: 0;
       flex-shrink: 0;
       white-space: nowrap;
       background: #8c83ff;
        background: -webkit-linear-gradient(to right, #8c83ff 0%, #32A98C 100%);
        background: -moz-linear-gradient(to right, #8c83ff 0%, #32A98C 100%);
        background: linear-gradient(to right, #8c83ff 0%, #32A98C 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
     }
   }
 }
  
`;

export default GlobalStyle;
