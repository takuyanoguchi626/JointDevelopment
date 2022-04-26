import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      header
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
      <hr />
    </div>
  );
};
