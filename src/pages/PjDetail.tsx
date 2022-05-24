import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Project } from "../../types/Project";
import "../css/PjDetail.css";

export const PjDetail = (props: any) => {
  const navigate = useNavigate();

  //URLから取得したプロジェクトID
  const { id } = useParams();
  if (!id) {
    throw new Error("ddd");
  }

  //プロジェクト詳細情報
  const [project, setProject] = useState<Project>({
    userId: 0, //投稿者
    postDate: "1111-11-11",
    teamName: "ECサイトチーム",
    content: "簡単なECサイトを開発します！",
    startDate: "1111-11-11",
    endDate: "1111-11-11",
    frequencyMonthOrWeek: "string",
    frequencyDay: 0,
    contentDetail: "string",
    recruitLang: {
      CL: 1,
      Web: 1,
      FR: 1,
      ML: 1,
      QA: 1,
    },
  });

  //フォーマット化されたプロジェクトのdate型のデータ
  const startDate = format(new Date(project.startDate), "yyyy年MM月dd日");
  const endDate = format(new Date(project.endDate), "yyyy年MM月dd日");
  const postDate = format(new Date(project.postDate), "yyyy年MM月dd日");

  //ログイン中のユーザーが立ち上げたプロジェクトなのかのflag
  let isProjectCreateUser = false;

  //ログイン中のユーザーが表示するプロジェクトに参加申し込みを既に送ってるかのflag
  let hasRequest = false;

  //現在の募集状況のパーセンテージ
  const [recruitRatio, setRecruitRatio] = useState<number>(0);

  /**
   * プロジェクト詳細情報を取得する.
   *
   */
  useEffect(() => {
    const axiosGet = async () => {
      const res = await axios.get(
        `http://localhost:8080/jointDevelopmnet/findProject/detail/?projectId=${id}`
      );
      console.log(res);
      //ログイン中のユーザーが立ち上げたプロジェクトなのか判断する
      if (res.data.userId === sessionStorage.getItem("loginUserId")) {
        isProjectCreateUser = true;
      }
      //ログイン中のユーザーが表示するプロジェクトに参加申し込みを既に送ってるか判断する
      for (const applicant of res.data.applicantList) {
        if (applicant.id === sessionStorage.getItem("loginUserId")) {
          hasRequest = true;
        }
      }
      const totalRecruitLangNumber =
        res.data.recruitLang.langCl +
        res.data.recruitLang.langWeb +
        res.data.recruitLang.langFR +
        res.data.recruitLang.langML +
        res.data.recruitLang.langQA;
      setRecruitRatio(
        (res.data.applicantList.length / totalRecruitLangNumber) * 100
      );
    };
    axiosGet();
  }, []);

  /**
   * 参加申し込みをする.
   *
   */
  const requestJoin = async () => {
    await axios
      .post("http://localhost:8080/jointDevelopmnet/projectDetail/upsert", {
        projectId: id,
        userId: sessionStorage.getItem("loginUserId"),
        status: "pending",
      })
      .then((res) => {
        hasRequest = true;
        console.log(res);
      });
  };

  /**
   * 参加申し込みをキャンセルする.
   *
   */
  const cancelRequestJoin = async () => {
    await axios
      .post("http://localhost:8080/jointDevelopmnet/projectDetail/upsert", {
        projectId: id,
        userId: sessionStorage.getItem("loginUserId"),
        status: "cancel",
      })
      .then((res) => {
        hasRequest = true;
        console.log(res);
      });
  };

  return (
    <Card className="p-3">
      <Card.Title>{project.content}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        募集エンジニア：CL({project.recruitLang.CL})/Web(
        {project.recruitLang.Web})/FR({project.recruitLang.FR})/ML(
        {project.recruitLang.ML})/QA({project.recruitLang.QA})
      </Card.Subtitle>
      <Card>
        <Card.Header className="CardHeader" as="h5">
          募集状況:45%
        </Card.Header>
        <Card.Body>
          <ProgressBar animated now={recruitRatio} />
        </Card.Body>
      </Card>

      {(() => {
        if (!isProjectCreateUser) {
          if (hasRequest) {
            return (
              <Button
                type="submit"
                value="Submit"
                variant="success"
                onClick={() => cancelRequestJoin()}
              >
                参加申し込みを取り消す
              </Button>
            );
          } else {
            return (
              <Button
                type="submit"
                value="Submit"
                variant="success"
                onClick={() => requestJoin()}
              >
                参加を申し込む
              </Button>
            );
          }
        }
      })()}

      <Card.Header className="CardHeader" as="h5">
        プロジェクト詳細
      </Card.Header>
      <Card.Body>
        <div>
          <strong>チーム名</strong>
        </div>
        <p>{project.teamName}</p>
        <hr />
        <div>
          <strong>募集エンジニア</strong>
        </div>
        <p>
          CL({})/Web({})/FR({})/ML({})/QA({})
        </p>
        <hr />
        <div>
          <strong>発足日</strong>
        </div>
        <p>{postDate}</p>
        <hr />
        <div>
          <strong>開発期間</strong>
        </div>
        <p>
          {startDate}~{endDate}
        </p>
        <hr />
        <div>
          <strong>活動頻度</strong>
        </div>
        <p>
          {project.frequencyDay}日/
          {project.frequencyMonthOrWeek}
        </p>
        <hr />
        <div>
          <strong>現在参加予定メンバー</strong>
        </div>
        <ul>
          <li>野口拓也</li>
          <li>野口拓也</li>
          <li>野口拓也</li>
        </ul>
        <hr />
        <div>
          <strong>開発内容説明（募集要項）</strong>
        </div>
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
      </Card.Body>

      {(() => {
        if (!isProjectCreateUser) {
          if (hasRequest) {
            return (
              <Button
                type="submit"
                value="Submit"
                variant="success"
                onClick={() => cancelRequestJoin()}
              >
                参加申し込みを取り消す
              </Button>
            );
          } else {
            return (
              <Button
                type="submit"
                value="Submit"
                variant="success"
                onClick={() => requestJoin()}
              >
                参加を申し込む
              </Button>
            );
          }
        }
      })()}
    </Card>
  );
};
