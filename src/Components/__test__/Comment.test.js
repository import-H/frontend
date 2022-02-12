import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Comment from "../Comment";
import * as reactRedux from "react-redux";

const MockComment = () => {
  return (
    <BrowserRouter>
      <Comment />
    </BrowserRouter>
  );
};

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Comment Test", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("Comment Title 존재", () => {
    render(<MockComment />);
    const commentTitle = screen.getByTitle(/comment/i);
    expect(commentTitle).toBeInTheDocument();
  });

  it("로그인시, 댓글 작성란 존재", () => {
    useSelectorMock.mockImplementation(selectorFn =>
      selectorFn({ auth: { isAuth: true } }),
    );
    render(<MockComment />);

    // input 존재
    const commentInput = screen.getByPlaceholderText(/댓글을 작성하세요/i);
    expect(commentInput).toBeInTheDocument();

    // 버튼 존재
    const commentBtn = screen.getByText(/댓글 작성/i);
    expect(commentBtn).toBeInTheDocument();
  });
});
