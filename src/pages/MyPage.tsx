import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

export const MyPage = () => {
  const navigate = useNavigate();

  //ユーザー情報
  const [user, setUser] = useState<User>({
    name: "初期値太郎",
    hireDate: new Date("2022-01-04"),
    experience: "absence",
    kindOfEngineer: "CLWebFRMLQA",
    langList: ["syokichi"],
    selfIntroduction: "初めまして。これは初期値です。",
    projectTeamIdList: [{ projectId: 15, teamName: "あああああ", status: "1" }],
  });

  const formatHireDate = format(user.hireDate, "yyyy年MM月dd日");

  const [projectTeamList, setProjectTeamList] = useState<Array<string>>([
    "初期値。API連携したら消す。",
  ]);

  const experience = () => {
    if (user.experience === "presence") {
      return "あり";
    } else {
      return "なし";
    }
  };

  /**
   * ログイン中のユーザー情報を取得する.
   *
   */
  useEffect(() => {
    const response = axios
      .post("http://localhost:8080/jointDevelopment/user/mypage", {
        userId: sessionStorage.getItem("loginUserId"),
      })
      .then((res) => {
        console.log(res);
        const apiData = res.data;
        setUser({
          name: apiData.name,
          hireDate: apiData.hireDate,
          experience: apiData.experience,
          kindOfEngineer: apiData.kindOfEngineer,
          langList: apiData.langList,
          selfIntroduction: apiData.selfIntroduction,
        });
      });
  }, []);

  return (
    <div>
      <Card>
        <Card.Header className="CardHeader" as="h5">
          マイページ
        </Card.Header>
        <Card.Body>
          <div>
            <strong>名前</strong>
          </div>
          <p>{user.name}</p>
          <hr />
          <div>
            <strong>自己紹介文</strong>
          </div>
          <p>{user.selfIntroduction}</p>
          <hr />
          <div>
            <strong>入社年月日</strong>
          </div>
          <p>{formatHireDate}</p>
          <hr />
          <div>
            <strong>現場経験</strong>
          </div>
          <p>{experience()}</p>
          <hr />
          <div>
            <strong>エンジニア種別</strong>
          </div>
          <p>{user.kindOfEngineer}</p>
          <hr />
          <div>
            <strong>使用可能言語</strong>
          </div>
          <p>{user.langList}</p>
          <hr />
          <div>
            <strong>所属チーム</strong>
          </div>
          {user.projectTeamIdList?.map((team) => {
            return (
              <div>
                <p>{team.teamName}</p>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
};
