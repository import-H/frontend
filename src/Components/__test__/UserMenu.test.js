import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserMenu from "../UserMenu";
import * as reactRedux from "react-redux";

const MockUserMenu = () => {
  return (
    <BrowserRouter>
      <UserMenu />
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

  it("비로그인시 로그인, 회원가입 버튼 생성", () => {
    useSelectorMock.mockImplementation(selectorFn =>
      selectorFn({ auth: { isAuth: false } }),
    );
    render(<MockUserMenu />);
    const beforeLogin = screen.getByRole("beforeLogin");
    expect(beforeLogin).toBeInTheDocument();
  });

  it("로그인시 마이페이지, 로그아웃 버튼 생성", () => {
    useSelectorMock.mockImplementation(selectorFn =>
      selectorFn({ auth: { isAuth: true } }),
    );
    render(<MockUserMenu />);
    const afterLogin = screen.getByRole("afterLogin");
    expect(afterLogin).toBeInTheDocument();
  });
});

describe("버튼 클릭 이벤트", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  const isAuthSelector = authType => {
    useSelectorMock.mockImplementation(selectorFn =>
      selectorFn({ auth: { isAuth: authType } }),
    );
  };

  it("로그인 상태에서 UserMenu 버튼 클릭 이벤트", () => {
    isAuthSelector(false);
    render(<MockUserMenu />);

    // login
    const loginBtn = screen.getByText("로그인").closest("a");
    expect(loginBtn).toHaveAttribute("href", `/login`);
    // register
    const registerBtn = screen.getByText("회원가입").closest("a");
    expect(registerBtn).toHaveAttribute("href", `/register`);
  });

  it("비로그인 상태에서 UserMenu 버튼 클릭 이벤트", () => {
    isAuthSelector(true);

    const logout = jest.fn();
    useDispatchMock.mockReturnValue(logout);
    render(<MockUserMenu />);

    // logout
    const logoutBtn = screen.getByText(/로그아웃/);
    fireEvent.click(logoutBtn);
    expect(logout).toHaveBeenCalled();

    // mypage
    const myPageBtn = screen.getByText("마이페이지").closest("a");
    expect(myPageBtn).toHaveAttribute("href", `/mypage`);
  });
});
