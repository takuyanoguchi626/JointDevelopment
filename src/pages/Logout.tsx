import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("loginUserId", "");
  }, []);

  return (
    <div>
      <h1>ログアウトしました。</h1>
      <button onClick={() => navigate("/PjList")}>プロジェクト一覧へ</button>
    </div>
  );
};
