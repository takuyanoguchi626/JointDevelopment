import React from "react";
import { Link } from "react-router-dom";
import "../css/PjList.css";

export const PjList = () => {
  return (
    <>
      <div>
        <div>
          エンジニア種別：
          <select name="" id="">
            <option value="CL">CL</option>
            <option value="Web">Web</option>
            <option value="FR">FR</option>
            <option value="ML">ML</option>
            <option value="QA">QA</option>
          </select>
        </div>
        <div>
          使用言語：
          <input type="text" placeholder="ex)react vue java" />
        </div>
        <div>
          活動頻度：
          <select>
            <option value="month">月</option>
            <option value="week">週</option>
          </select>
          <input type="number" />回
        </div>
        <button>検索</button>
      </div>
      <h1>メンバー募集一覧</h1>
      <div className="team">
        <Link to={"/PjDetail/"}>
          <h2>チームECサイト</h2>
          <h3>メンバー</h3>
          <ul>
            <li>野口</li>
            <li>板倉</li>
            <li>矢崎</li>
            <li>後藤</li>
          </ul>
          <h3>概要</h3>
          <p>
            フロントとバックエンド、インフラで集まり、ECサイトを構築します。
          </p>
        </Link>
      </div>
      <div className="team">
        <h2>チームECサイト</h2>
        <h3>メンバー</h3>
        <ul>
          <li>野口</li>
          <li>板倉</li>
          <li>矢崎</li>
          <li>後藤</li>
        </ul>
        <h3>概要</h3>
        <p>フロントとバックエンド、インフラで集まり、ECサイトを構築します。</p>
      </div>
      <div className="team">
        <h2>チームECサイト</h2>
        <h3>メンバー</h3>
        <ul>
          <li>野口</li>
          <li>板倉</li>
          <li>矢崎</li>
          <li>後藤</li>
        </ul>
        <h3>概要</h3>
        <p>フロントとバックエンド、インフラで集まり、ECサイトを構築します。</p>
      </div>
    </>
  );
};
