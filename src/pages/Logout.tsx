import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("loginUserId", "");
    setTimeout(() => {
      navigate("/PjList");
    }, 3000);
  }, []);

  return (
    <div>
      <h1>ログアウトしました。</h1>
      <div>数秒後にプロジェクト一覧へ戻ります</div>
      <button onClick={() => navigate("/PjList")}>プロジェクト一覧へ</button>
    </div>
  );
};
