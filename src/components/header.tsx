import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Link to={"/PjList"}> */}
      <h1 onClick={() => navigate("/PjList")}>共同開発募集サイト</h1>
      {/* </Link> */}
      <button onClick={() => navigate("/MyPage")}>マイページ</button>
      <button
        onClick={() => {
          navigate("/PjCreate");
        }}
      >
        PJ作成
      </button>
      <button onClick={() => navigate("/RegisterUser")}>会員登録</button>
      <button onClick={() => navigate("/Login")}>ログイン</button>
      <button onClick={() => navigate("/Logout")}>ログアウト</button>
      <button onClick={() => navigate("/PjList")}>PJ一覧</button>
      <hr />
    </div>
  );
};
