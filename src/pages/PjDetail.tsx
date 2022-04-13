import React from "react";
import "../css/PjDetail.css";

export const PjDetail = () => {
  return (
    <div>
      <h2>ECサイトプロジェクト</h2>
      <button>申請</button>
      <h2>メンバー</h2>
      <div className="memberList">
        <div className="member">
          <img className="iconImage" src="/1.jpg" alt="" />
          <div>
            <p>野口拓也</p>
            <p>使える技術：react/vue/javascript</p>
            <p>積極的に共同開発していきたいです！！</p>
          </div>
        </div>
        <div className="member">
          <img className="iconImage" src="/1.jpg" alt="" />
          <div>
            <p>野口拓也</p>
            <p>使える技術：react/vue/javascript</p>
            <p>積極的に共同開発していきたいです！！</p>
          </div>
        </div>
        <div className="member">
          <img className="iconImage" src="/1.jpg" alt="" />
          <div>
            <p>野口拓也</p>
            <p>使える技術：react/vue/javascript</p>
            <p>積極的に共同開発していきたいです！！</p>
          </div>
        </div>
      </div>
      <div>募集中！！！</div>
      <p>＜こんな方を募集中＞</p>
      <p>reactができる方/Javaで開発したことある方/AWSの知識のある方/</p>
    </div>
  );
};
