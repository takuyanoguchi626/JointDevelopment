/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/User";

export const UserPage = () => {
  const navigate = useNavigate();

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    if (userId === sessionStorage.getItem("loginUserId")) {
      navigate("/MyPage");
    }
  }, []);

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

  const formatHireDate = format(new Date(user.joiningDate), "yyyy年MM月dd日");

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
    axios
      .post("http://localhost:8080/jointDevelopment/user/mypage", {
        userId: userId,
      })
      .then((res) => {
        setUser(() => res.data);
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
                <Link className="link" to={`/PjDetail/${team.projectId}`}>
                  <p>{team.teamName}</p>
                </Link>
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
                <Link className="link" to={`/PjDetail/${team.projectId}`}>
                  <p>{team.teamName}</p>
                </Link>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </div>
  );
};
