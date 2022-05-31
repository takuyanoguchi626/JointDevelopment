import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const [rerenderNumber, rerender] = useState(0);

  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand onClick={() => navigate("/PjList")}>
          共同開発募集サイト
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/PjList")}>
            プロジェクト一覧
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/PjCreate");
            }}
          >
            新規プロジェクト作成
          </Nav.Link>

          {sessionStorage.getItem("loginUserId") && (
            <>
              <Nav.Link onClick={() => navigate("/MyPage")}>
                マイページ
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  sessionStorage.setItem("loginUserId", "");
                  rerender((num) => num + 1);
                  navigate("/Logout");
                }}
              >
                ログアウト
              </Nav.Link>
            </>
          )}
          {!sessionStorage.getItem("loginUserId") && (
            <>
              <Nav.Link onClick={() => navigate("/RegisterUser")}>
                会員登録
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/Login")}>ログイン</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
