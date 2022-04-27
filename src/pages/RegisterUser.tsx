import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const navigate = useNavigate();

  const [langList, setLangList] = useState<Array<string | undefined>>([]);
  const [langName, setLangName] = useState<string>("");

  const addLang = () => {
    setLangList((langList) => [...langList, langName]);
    setLangName("");
  };
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
        エンジニア種別：
        <select name="" id="">
          <option value="" unselectable="on">
            --
          </option>
          <option value="CL">CL</option>
          <option value="Web">Web</option>
          <option value="FR">FR</option>
        </select>
      </div>
      <div>
        使用可能言語：
        <input
          type="text"
          value={langName}
          onChange={(e) => setLangName(e.target.value)}
        />
        <button onClick={() => addLang()}>追加</button>
        <ul>
          {langList.map((langName, index) => {
            return <li key={index}>{langName}</li>;
          })}
        </ul>
      </div>
      <div>
        <button onClick={() => navigate("/Login")}>会員登録</button>
      </div>
    </>
  );
};
