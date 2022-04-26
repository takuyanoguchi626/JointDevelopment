import React from "react";
import "../css/PjDetail.css";

export const PjDetail = () => {
  return (
    <div>
      <h2>ECサイトプロジェクト</h2>
      <div>プロジェクト説明：簡単なECサイトの開発をしようと考えています。</div>
      <div>発足日：2022年3月25日</div>
      <div>現在の募集状況：募集中！！！</div>
      <div>募集エンジニア：CL,Web,FR</div>
      <div>活動予定期間：2022年4月15日～1カ月程度・週3・2h/日</div>
      <div>現在参加予定メンバー</div>
      <p>それぞれのエンジニアが2人以上集まった段階で締め切ります。</p>
      <div className="memberList">
        <div className="member">
          <img className="iconImage" src="/1.jpg" alt="" />
          <div>
            <p>野口拓也(FR)</p>
            <p>使える技術：react/vue/javascript</p>
            <p>積極的に共同開発していきたいです！！</p>
          </div>
        </div>
        <div className="member">
          <img className="iconImage" src="/1.jpg" alt="" />
          <div>
            <p>野口拓也(FR)</p>
            <p>使える技術：react/vue/javascript</p>
            <p>積極的に共同開発していきたいです！！</p>
          </div>
        </div>
        <div className="member">
          <img className="iconImage" src="/1.jpg" alt="" />
          <div>
            <p>野口拓也(FR)</p>
            <p>使える技術：react/vue/javascript</p>
            <p>積極的に共同開発していきたいです！！</p>
          </div>
        </div>
      </div>
      <p>＜こんな方を募集中＞</p>
      <p>reactができる方/Javaで開発したことある方/AWSの知識のある方/</p>
      <button>参加申し込み</button>
    </div>
  );
};
