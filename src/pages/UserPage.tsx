import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";

export const UserPage = () => {
  const navigate = useNavigate();

  //ユーザー情報
  const [user, setUser] = useState<User>({
    name: "初期値太郎",
    joiningDate: "2022-01-04",
    experience: "absence",
    engineerKinds: "CLWebFRMLQA",
    otherAvailableLang: ["syokichi"],
    introduction: "初めまして。これは初期値です。",
    team2List: [{ projectId: 15, teamName: "あああああ", status: "1" }],
    teamList: [{ projectId: 15, teamName: "あああああ", status: "1" }],
  });

  // const formatHireDate = format(user.joiningDate, "yyyy年MM月dd日");

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
          joiningDate: apiData.joiningDate,
          experience: apiData.experience,
          engineerKinds: apiData.engineerKinds,
          otherAvailableLang: apiData.otherAvailableLang,
          introduction: apiData.introduction,
        });
      });
  }, []);

  return (
    <div>
      <Card>
        <Card.Header className="CardHeader" as="h5">
          ユーザーページ
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
          <p>{user.introduction}</p>
          <hr />
          <div>
            <strong>入社年月日</strong>
          </div>
          <p>{user.joiningDate}</p>
          <hr />
          <div>
            <strong>現場経験</strong>
          </div>
          <p>{experience()}</p>
          <hr />
          <div>
            <strong>エンジニア種別</strong>
          </div>
          <p>{user.engineerKinds}</p>
          <hr />
          <div>
            <strong>使用可能言語</strong>
          </div>
          <p>{user.otherAvailableLang}</p>
          <hr />
          <div>
            <strong>所属チーム</strong>
          </div>
          {user.team2List?.map((team, index) => {
            return (
              <div key={index}>
                <p>{team.teamName}</p>
              </div>
            );
          })}
          <hr />
          <div>
            <strong>立ち上げたプロジェクト</strong>
          </div>
          {user.teamList?.map((team, index) => {
            return (
              <div key={index}>
                <p>{team.teamName}</p>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
};
