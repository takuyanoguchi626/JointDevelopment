import React from "react";
import "../css/PjDetail.css";

export const PjDetail = () => {
  return (
    <div>
      <h2>ECサイトプロジェクト</h2>
      <div>プロジェクト概要：簡単なECサイトの開発をしようと考えています。</div>
      <div>プロジェクト説明：</div>
      <pre>
        開発にあたって、FRはreactかvueでの開発をお願いしたいです。
        WebはjavaもしくはPHPでの開発経験のある方を募集します。
        CLはこれらの言語のアプリを運用したことがある方を優先して採用します。
      </pre>
      <div>発足日：2022年3月25日</div>
      <div>現在の募集状況：募集中！！！</div>
      <div>募集エンジニア：CL,Web,FR</div>
      <div>活動期間：2022年4月15日～2022年5月15日</div>
      <div>活動頻度：週３</div>
      <div>現在参加予定メンバー</div>
      <p>各エンジニアが2人以上集まった段階で締め切ります。</p>
      <div>現在集まっているエンジニア一覧：</div>
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
