import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserList from "../UserList";
import * as reactRedux from "react-redux";

const MockUserList = () => {
  return (
    <BrowserRouter>
      <UserList />
    </BrowserRouter>
  );
};

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("UserMenu Test", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("개인활동 페이지로 가는 유저 링크 존재", () => {
    useSelectorMock.mockImplementation(selectorFn =>
      selectorFn({
        user: {
          users: [
            { userId: 1, pathId: 1, profileImage: "a.png", nickname: "jamong" },
          ],
        },
      }),
    );
    const getUsers = jest.fn();
    useDispatchMock.mockReturnValue(getUsers);
    render(<MockUserList />);

    // userLink 존재
    const userLink = screen.getByTitle("userLink");
    expect(userLink).toBeInTheDocument();
  });

  it("유저 링크 클릭 시 이벤트", () => {
    useSelectorMock.mockImplementation(selectorFn =>
      selectorFn({
        user: {
          users: [
            { userId: 1, pathId: 1, profileImage: "a.png", nickname: "jamong" },
          ],
        },
      }),
    );
    const getUsers = jest.fn();
    useDispatchMock.mockReturnValue(getUsers);
    render(<MockUserList />);

    const userLink = screen.getByTitle("userLink");
    expect(userLink).toHaveAttribute("href", `/1`);
  });
});
