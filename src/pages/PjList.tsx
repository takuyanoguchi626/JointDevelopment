import React from "react";
import { Link } from "react-router-dom";
import "../css/PjList.css";

export const PjList = () => {
  return (
    <>
      <h1>共同開発プロジェクト一覧</h1>
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
