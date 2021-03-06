export { default as Main } from "./Main";
export { default as Login } from "./auth/Login";
export { default as Register } from "./auth/Register";
export { default as OAuth } from "./auth/OAuth";
export { default as Board } from "./Board";
export { default as Post } from "./Post";
export { default as PersonalBoard } from "./PersonalBoard";
export { default as MyPage } from "./MyPage";
export { default as Admin } from "./Admin";
export { default as Leave } from "./Leave";
export { default as UserList } from "./UserList";
export { default as ChangePassword } from "./ChangePassword";

// 다른 페이지에서 각 페이지들을 한꺼번에 가져올 수 있도록 index.js추가
// 사용 예시: import { Main, Login, Register } from "./pages";
