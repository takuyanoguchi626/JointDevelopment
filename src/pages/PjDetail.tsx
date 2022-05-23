import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../types/Project";
import "../css/PjDetail.css";

export const PjDetail = (props: any) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [hasRequest, setHasRequest] = useState<boolean>();

  useEffect(() => {
    const axiosGet = async () => {
      await axios.get("osdifjosjgsodifosdf/?id=${id}").then((res) => {
        setHasRequest(res.data);
      });
    };
  }, []);

  const [project, setProject] = useState<Project>({
    userId: 0, //投稿者
    postDate: "string",
    teamName: "string",
    content: "string",
    startDate: "1111-11-11",
    endDate: "string",
    frequencyMonthOrWeek: "string",
    frequencyDay: 0,
    contentDetail: "string",
  });

  const startDate = format(new Date(project.startDate), "yyyy年MM月dd日");
  const endDate = format(new Date(project.endDate), "yyyy年MM月dd日");
  const postDate = format(new Date(project.postDate), "yyyy年MM月dd日");

  // const axiosGet = async () => {
  //   const response = await axios.get("");
  //   //setStateを行い、responseを代入する
  // };

  // useEffect(() => {
  //   axiosGet();
  // }, []);

  const requestJoin = async () => {
    // //ログインしているかのAPI
    // await axios.get("").then((res) => {
    //   if (!res) {
    //     navigate("/Login");
    //   }
    // });
    //参加申し込みのAPI
    await axios.post("", {}).then(() => {
      setHasRequest(true);
    });
  };

  const cancelRequestJoin = () => {};

  return (
    <div>
      <h2>{project.content}</h2>
      <p>チーム名：{project.teamName}</p>

      <p>
        募集エンジニア：CL({})/Web({})/FR({})/ML({})/QA({})
      </p>
      <p>発足日：{postDate}</p>
      <p>
        開発期間：{startDate}~{endDate}
      </p>
      <p>
        活動頻度：{project.frequencyDay}日/
        {project.frequencyMonthOrWeek}
      </p>
      <div>現在参加予定メンバー</div>
      <ul>
        <li>野口拓也</li>
        <li>野口拓也</li>
        <li>野口拓也</li>
      </ul>
      <p>開発内容説明（募集要項）：</p>
      <pre>
        {`
        簡単なECサイトを開発します。
        機能としては、ログイン機能と、商品購入の一連の流れ程度を想定しています。
        追加機能は開発の進捗を見て決めていこうと思っています。
        開発にあたって、FRはreactかvueでの開発をお願いしたいです。
        WebはjavaもしくはPHPでの開発経験のある方を募集します。
        CLはこれらの言語のアプリを運用したことがある方を優先して採用します。
        `}
      </pre>
      {(() => {
        if (hasRequest) {
          return (
            <button onClick={() => cancelRequestJoin()}>
              参加申し込みを取り消す
            </button>
          );
        } else {
          return <button onClick={() => requestJoin()}>参加を申し込む</button>;
        }
      })()}
    </div>
  );
};
