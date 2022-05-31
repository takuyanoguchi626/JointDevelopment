/* eslint-disable react-hooks/exhaustive-deps */
import { format } from "date-fns";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../css/PjDetail.css";
import { roundTo } from "round-to";
import { useGetProjectDetail } from "../hooks/useGetProjectDetail";
import { useGetApplicantList } from "../hooks/useGetApplicantList";
import { usePostRequestChoice } from "../hooks/usePostRequestChoice";
import { useApprovalRequestJoin } from "../hooks/useApprovalRequestJoin";
import { FlagsContext } from "../components/providers/FlagsProvider";
import { ApprovalCountSensorContext } from "../components/providers/ApprovalCountSensorProvider";
import { CompButton } from "../components/CompButton";
import axios from "axios";

export const PjDetail = (props: any) => {
  //URLから取得したプロジェクトID
  const { id } = useParams();
  if (!id) {
    throw new Error("URLにプロジェクトIDがありません。");
  }

  //各flagを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  const isProjectCreateUser = flags.isProjectCreateUser;
  const hasRequest = flags.hasRequest;
  const isJoinUser = flags.isJoinUser;

  // //承認カウントセンサーを取得する
  const approvalCountSensorKit = useContext(ApprovalCountSensorContext);
  if (!approvalCountSensorKit) {
    throw new Error("承認カウントセンサーがないです");
  }
  const approvalCountSensor = approvalCountSensorKit.approvalCountSensor;

  //プロジェクトを取得するカスタムフック
  const { project, getProjectDetail } = useGetProjectDetail(Number(id));

  //参加申請者を取得するカスタムフック
  const { applicantList, getApplicantList } = useGetApplicantList(Number(id));

  //プロジェクトへ参加申請か不参加申請を送るカスタムフック
  const { postRequestChoice } = usePostRequestChoice(Number(id));

  //参加申請を承諾するカスタムフック
  const { approvalRequestJoin } = useApprovalRequestJoin(Number(id));

  //プロジェクトのdate型のデータをフォーマット化
  const startDate = format(new Date(project.startDate), "yyyy年MM月dd日");
  const endDate = format(new Date(project.endDate), "yyyy年MM月dd日");
  const postDate = format(new Date(project.postDate), "yyyy年MM月dd日");

  //
  const [createUser, setCreateUser] = useState("");

  //
  useEffect(() => {
    const response = axios
      .post("http://localhost:8080/jointDevelopment/user/mypage", {
        userId: project.userId,
      })
      .then((res) => {
        console.log(res);
        setCreateUser(() => res.data.name);
      });
  }, [project]);

  //現在の募集状況のパーセンテージ
  const [recruitRatio, setRecruitRatio] = useState<number>(0);

  //求める募集エンジニアの合計人数
  const [totalRecruitLangNumber, setTotalRecruitLangNumber] =
    useState<number>(1);

  /**
   * 画面描画時に、プロジェクト・参加申請者・参加率を取得する.
   */
  useLayoutEffect(() => {
    getProjectDetail();
    getApplicantList();
  }, [isProjectCreateUser, hasRequest, approvalCountSensor]);
  useLayoutEffect(() => {
    setRecruitRatio(
      () => (project.projectUserList?.length / totalRecruitLangNumber) * 100
    );
    setTotalRecruitLangNumber(
      () =>
        Number(project.recruitLang.langCl) +
        Number(project.recruitLang.langWeb) +
        Number(project.recruitLang.langFr) +
        Number(project.recruitLang.langMl) +
        Number(project.recruitLang.langQa)
    );
  }, [project, approvalCountSensor]);
  useLayoutEffect(() => {
    flags.setIsProjectCreateUser(() => false);
    flags.setHasRequest(() => false);
    flags.setIsJoinUser(() => false);
  }, []);

  console.log(isJoinUser);

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
          募集状況:{roundTo(recruitRatio, 0)}%
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
                  <div>
                    {applicant.name}({applicant.engineerKinds})
                  </div>
                  <CompButton
                    onClick={approvalRequestJoin}
                    arg={applicant.userId}
                    variant="success"
                  >
                    承認
                  </CompButton>
                </div>
              );
            })}
          </Card.Body>
        </Card>
      )}
      {!isProjectCreateUser && !isJoinUser && hasRequest && (
        <CompButton onClick={postRequestChoice} arg="cancel" variant="danger">
          参加申し込みを取り消す
        </CompButton>
      )}
      {!isProjectCreateUser && !isJoinUser && !hasRequest && (
        <CompButton onClick={postRequestChoice} arg="pending" variant="success">
          参加を申し込む
        </CompButton>
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
          <strong>創設者</strong>
        </div>
        <Link className="link" to={`/UserPage/${project.userId}`}>
          <p>{createUser}</p>
        </Link>
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
              <Link
                className="link"
                key={index}
                to={`/UserPage/${user.userId}`}
              >
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
        <hr />
      </Card.Body>
      {!isProjectCreateUser && !isJoinUser && hasRequest && (
        <CompButton onClick={postRequestChoice} arg="cancel" variant="danger">
          参加申し込みを取り消す
        </CompButton>
      )}
      {!isProjectCreateUser && !isJoinUser && !hasRequest && (
        <CompButton onClick={postRequestChoice} arg="pending" variant="success">
          参加を申し込む
        </CompButton>
      )}
    </Card>
  );
};
