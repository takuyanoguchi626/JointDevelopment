import React from "react";

export const Login = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <div>
        メールアドレス：
        <input type="text" />
      </div>
      <div>
        パスワード：
        <input type="text" />
      </div>
      <div>
        <button>ログイン</button>
      </div>
    </div>
  );
};
