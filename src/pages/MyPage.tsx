import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { User } from "../../types/User";

export const MyPage = () => {
  const [user, setUser] = useState<User>({
    name: "初期値太郎",
    Email: "syokichi@mail.com",
    hireDate: new Date("2022-01-04"),
    experience: false,
    kindOfEngineer: "CLWebFRMLQA",
    langList: ["syokichi"],
    selfIntroduction: "初めまして。これは初期値です。",
    projectTeamIdList: [0],
  });

  const formatHireDate = format(user.hireDate, "yyyy年MM月dd日");

  const [projectTeamList, setProjectTeamList] = useState<Array<string>>([
    "初期値。API連携したら消す。",
  ]);

  // useEffect(() => {
  //   if (user.projectTeamIdList !== undefined) {
  //     axios
  //       .get(`URL?projectTeamIdList=${user.projectTeamIdList}`)
  //       .then((res) => {
  //         setProjectTeamList((projectTeamList) => {
  //           const projectTeamList2 = [...projectTeamList];
  //           for (const teamName of res.data) {
  //             projectTeamList2.push(teamName);
  //           }
  //           return projectTeamList2;
  //         });
  //       });
  //   }
  // }, []);

  const experience = () => {
    if (user.experience) {
      return "あり";
    } else {
      return "なし";
    }
  };

  // useEffect(() => {
  //   const response = axios.get("").then((res) => {
  //     const apiData = res.data;
  //     setUser({
  //       name: apiData.name,
  //       Email: apiData.Email,
  //       hireDate: apiData.hireDate,
  //       experience: apiData.experience,
  //       kindOfEngineer: apiData.kindOfEngineer,
  //       langList: apiData.langList,
  //       selfIntroduction: apiData.selfIntroduction,
  //     });
  //   });
  // }, []);

  return (
    <div>
      <h1>マイページ</h1>
      <div>名前：{user.name}</div>
      <div>自己紹介文：{user.selfIntroduction}</div>
      <div>入社年月日：{formatHireDate}</div>
      <div>現場経験：{experience()}</div>
      <div>エンジニア種別：{user.kindOfEngineer}</div>
      <div>使用可能言語：{user.langList}</div>
      <div>所属チーム：{projectTeamList}</div>
    </div>
  );
};
