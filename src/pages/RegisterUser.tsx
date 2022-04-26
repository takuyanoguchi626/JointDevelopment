import React from "react";

export const RegisterUser = () => {
  return (
    <>
      <h1>会員登録</h1>
      <div>
        名前：
        <input type="text" />
      </div>
      <div>
        メールアドレス：
        <input type="text" />
      </div>
      <div>
        パスワード：
        <input type="text" />
      </div>
      <div>
        確認用パスワード：
        <input type="text" />
      </div>
      <div>
        <button>会員登録</button>
      </div>
    </>
  );
};
