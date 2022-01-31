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

    .flex{
        display: flex;
    }
    .flex-d-c{
        flex-direction: column;
    }
    .flex-jc-c{
        justify-content: center;
    }
    .flex-ai-c{
        align-items: center;
    }
`;

export default GlobalStyle;
