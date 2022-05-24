import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./providers/LoginProvider";

export const Header = () => {
  const navigate = useNavigate();

  const isLoginContext = useContext(LoginContext);

  if (!isLoginContext) {
    throw new Error("context is undefined");
  }

  // useEffect(() => {
  //   const axiosGet = async () => {
  //     //ログイン状態を取得する。
  //     const response = await axios.get("");
  //     isLoginContext.setIsLogin(response);
  //   };
  // }, []);

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
          <Nav.Link onClick={() => navigate("/MyPage")}>マイページ</Nav.Link>
          {(() => {
            if (isLoginContext.isLogin) {
              return (
                <Nav.Link onClick={() => navigate("/Logout")}>
                  ログアウト
                </Nav.Link>
              );
            } else {
              return (
                <Nav.Link onClick={() => navigate("/Login")}>ログイン</Nav.Link>
              );
            }
          })()}
          <Nav.Link onClick={() => navigate("/RegisterUser")}>
            会員登録
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
