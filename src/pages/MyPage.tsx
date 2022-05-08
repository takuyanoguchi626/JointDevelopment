import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "../../types/User";

export const MyPage = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const response = axios.get("").then((res) => {
      const apiData = res.data;
      setUser({
        name: apiData.name,
        Email: apiData.Email,
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
      <h1>マイページ</h1>
      <div>名前：野口拓也</div>
      <div>入社年月日：2022年1月4日</div>
      <div>現場経験：なし</div>
      <div>エンジニア種別：FR</div>
      <div>使用可能言語：【react,vue,js,ts,css,html,jest,Linux】</div>
      <div>所属チーム：チームECサイト</div>
    </div>
  );
};
