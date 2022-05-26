import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Project, projectUser } from "../../types/Project";
import "../css/PjDetail.css";

export const PjDetail = (props: any) => {
  const navigate = useNavigate();

  //URLから取得したプロジェクトID
  const { id } = useParams();
  if (!id) {
    throw new Error("URLにプロジェクトIDがありません。");
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
      langCl: 1,
      langWeb: 1,
      langFr: 1,
      langMl: 1,
      langQa: 1,
    },
  });

  //プロジェクトのdate型のデータをフォーマット化
  const startDate = format(new Date(project.startDate), "yyyy年MM月dd日");
  const endDate = format(new Date(project.endDate), "yyyy年MM月dd日");
  const postDate = format(new Date(project.postDate), "yyyy年MM月dd日");

  //ログイン中のユーザーが立ち上げたプロジェクトなのかのflag
  const [isProjectCreateUser, setIsProjectCreateUser] = useState(false);

  //ログイン中のユーザーが表示するプロジェクトに参加申し込みを既に送ってるかのflag
  const [hasRequest, setHasRequest] = useState(false);

  //現在の募集状況のパーセンテージ
  const [recruitRatio, setRecruitRatio] = useState<number>(0);

  //プロジェクトへの参加申請者一覧
  const [applicantList, setApplicantList] = useState<Array<projectUser>>([
    {
      userId: 0,
      name: "",
      engineerKinds: "",
    },
  ]);

  /**
   * プロジェクト詳細情報を取得する.
   *
   */
  useLayoutEffect(() => {
    let isProjectCreateUser2 = false;
    const axiosGet = async () => {
      const res = await axios.get(
        `http://localhost:8080/jointDevelopment/findProject/detail/?projectId=${id}`
      );
      console.log(res);
      setProject(() => res.data);
      //ログイン中のユーザーが立ち上げたプロジェクトなのか判断する
      if (res.data.userId === Number(sessionStorage.getItem("loginUserId"))) {
        isProjectCreateUser2 = true;
        setIsProjectCreateUser(() => true);
        console.log("wewewewewewe");
      }

      const res2 = await axios.get(
        `http://localhost:8080/jointDevelopment/pjManagement/applicant/?projectId=${id}`
      );
      console.log(res2);
      if (isProjectCreateUser2) {
        console.log("sss");
        setApplicantList(res2.data);
      } else {
        //ログイン中のユーザーがプロジェクトに参加申し込みを既に送ってるか判断する
        console.log("ログイン中のユーザーが参加申請者か確認しました。");
        for (const applicant of res2.data) {
          if (applicant.userId === sessionStorage.getItem("loginUserId")) {
            setHasRequest(true);
          }
        }
      }

      const totalRecruitLangNumber =
        Number(res.data.recruitLang.langCl) +
        Number(res.data.recruitLang.langWeb) +
        Number(res.data.recruitLang.langFr) +
        Number(res.data.recruitLang.langMl) +
        Number(res.data.recruitLang.langQa);

      setRecruitRatio(
        () => (res.data.projectUserList.length / totalRecruitLangNumber) * 100
      );
    };
    axiosGet();
  }, []);

  /**
   * 参加申し込みをする.
   *
   */
  const requestJoin = async () => {
    if (sessionStorage.getItem("loginUserId")) {
      await axios
        .post("http://localhost:8080/jointDevelopment/projectDetail/upsert", {
          projectId: id,
          userId: sessionStorage.getItem("loginUserId"),
          status: "pending",
        })
        .then((res) => {
          setHasRequest(true);
          console.log(res);
        });
    } else {
      navigate("/Login");
    }
  };

  /**
   * 参加申し込みをキャンセルする.
   *
   */
  const cancelRequestJoin = async () => {
    if (sessionStorage.getItem("loginUserId")) {
      await axios
        .post("http://localhost:8080/jointDevelopment/projectDetail/upsert", {
          projectId: id,
          userId: sessionStorage.getItem("loginUserId"),
          status: "cancel",
        })
        .then((res) => {
          setHasRequest(true);
          console.log(res);
        });
    }
  };

  return (
    <Card className="p-3">
      <Card.Title>{project.content}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        募集エンジニア：CL({project.recruitLang.langCl})/Web(
        {project.recruitLang.langWeb})/FR({project.recruitLang.langFr})/ML(
        {project.recruitLang.langMl})/QA({project.recruitLang.langQa})
      </Card.Subtitle>
      <Card>
        <Card.Header className="CardHeader" as="h5">
          募集状況:{recruitRatio}%
        </Card.Header>
        <Card.Body>
          <ProgressBar animated now={recruitRatio} />
        </Card.Body>
      </Card>
      {isProjectCreateUser && (
        <Card>
          <Card.Header className="CardHeader" as="h5">
            参加申請者リスト
          </Card.Header>
          <Card.Body>
            {applicantList.map((applicant, index) => {
              return (
                <div key={index}>
                  {applicant.name}({applicant.engineerKinds})
                </div>
              );
            })}
          </Card.Body>
        </Card>
      )}
      {!isProjectCreateUser && hasRequest && (
        <Button
          type="submit"
          value="Submit"
          variant="success"
          onClick={() => cancelRequestJoin()}
        >
          参加申し込みを取り消す
        </Button>
      )}
      {!isProjectCreateUser && !hasRequest && (
        <Button
          type="submit"
          value="Submit"
          variant="success"
          onClick={() => requestJoin()}
        >
          参加を申し込む
        </Button>
      )}
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
          CL({project.recruitLang.langCl})/Web({project.recruitLang.langWeb}
          )/FR(
          {project.recruitLang.langFr})/ML({project.recruitLang.langMl})/QA(
          {project.recruitLang.langQa})
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
          {project.projectUserList?.map((user, index) => {
            return (
              <Link key={index} to={`/UserPage/${user.userId}`}>
                <li>{user.name}</li>
              </Link>
            );
          })}
        </ul>
        <hr />
        <div>
          <strong>開発内容説明（募集要項）</strong>
        </div>
        <pre>{project.contentDetail}</pre>
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
