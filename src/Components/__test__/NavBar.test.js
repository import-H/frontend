import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { Provider } from "react-redux";
import { store } from "../../reducers/store";
import { BrowserRouter } from "react-router-dom";
//import * as redux from "react-redux";

const MockNavBar = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
};

describe("NavBar Unit Test", () => {
  it("로고 있는지 확인", () => {
    render(<MockNavBar />);
    const logoElement = screen.getByAltText(/import-H/i);
    expect(logoElement).toBeInTheDocument();
  });

  it("게시판 메뉴 확인", () => {
    render(<MockNavBar />);
    const boardElement = screen.getByText("게시판");
    expect(boardElement).toBeInTheDocument();
  });

  it("개인활동 게시판 메뉴 확인", () => {
    render(<MockNavBar />);
    const UserBoardElement = screen.getByText("스터디 멤버");
    expect(UserBoardElement).toBeInTheDocument();
  });

  it("게시판 클릭했을 때 링크 동작 확인", () => {
    render(<MockNavBar />);
    const boardElement = screen.getByText("게시판").closest("a");
    expect(boardElement).toHaveAttribute("href", `/board/free`);
  });

  it("개인활동 게시판 링크 동작 확인", () => {
    render(<MockNavBar />);
    const boardElement = screen.getByText("스터디 멤버").closest("a");
    expect(boardElement).toHaveAttribute("href", `/posts`);
  });
});
