import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PjCreate = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>プロジェクト作成</h1>
      <div>
        チーム名：
        <input type="text" />
      </div>
      <div>開発概要：簡単なECサイトの開発です。</div>
      <div>
        開発内容説明：
        <textarea name="" id="" cols={30} rows={10}>
          開発にあたって、FRはreactかvueでの開発をお願いしたいです。
          WebはjavaもしくはPHPでの開発経験のある方を募集します。
          CLはこれらの言語のアプリを運用したことがある方を優先して採用します。
        </textarea>
      </div>
      <div>
        募集エンジニア人数：
        <div>
          CL:
          <input type="number" />人
        </div>
        <div>
          Web:
          <input type="number" />人
        </div>
        <div>
          FR:
          <input type="number" />人
        </div>
        <div>
          ML:
          <input type="number" />人
        </div>
        <div>
          QA:
          <input type="number" />人
        </div>
      </div>
      <div>
        開発期間：
        <input type="date" />~<input type="date" />
      </div>
      <div>
        活動頻度：
        <select name="" id="">
          <option value="month">月</option>
          <option value="week">週</option>
        </select>
        <input type="number" />回
      </div>
      <div>
        <button onClick={() => navigate("/PjList")}>プロジェクト作成</button>
      </div>
    </div>
  );
};
