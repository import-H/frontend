import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar";
import { Provider } from "react-redux";
import { store } from "../../reducers/store";
import { BrowserRouter } from "react-router-dom";
//import * as redux from "react-redux";

const API_URL = "http://localhost:3000";

const MockWritePost = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
};

describe("FollowersList", () => {
  it("check boardElement", () => {
    // const spy = jest.spyOn(redux, "useSelector");
    // spy.mockReturnValue({ username: "test" });
    render(<MockWritePost />);
    const boardElement = screen.getByText("게시판");
    expect(boardElement).toBeInTheDocument();
  });

  it("check UserBoardElement", () => {
    render(<MockWritePost />);
    const UserBoardElement = screen.getByText("개인활동 게시판");
    expect(UserBoardElement).toBeInTheDocument();
  });

  it("click boardElement", () => {
    render(<MockWritePost />);
    const boardElement = screen.getByText("게시판").closest("a");
    expect(boardElement).toHaveAttribute("href", `/board/free`);
  });
});
