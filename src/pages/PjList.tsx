import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/PjList.css";
import { Project } from "../../types/Project";
import { format } from "date-fns";

export const PjList = () => {
  //プロジェクト一覧をDBから取得する
  // useEffect(() => {
  //   let response;
  //   const axiosGet = async () => {
  //     response = await axios.get("");
  //   };
  //   axiosGet();
  // }, []);

  const [pjList, setPjList] = useState<Array<Project>>([
    {
      project_id: 1,
      user_id: 1,
      post_date: new Date(),
      team_name: "初期値チーム1",
      content: "初期値です。誰でも歓迎！",
      start_date: new Date(),
      end_date: new Date(),
      frequency_month_or_week: "月",
      frequency_day: 10,
    },
    {
      project_id: 2,
      user_id: 2,
      post_date: new Date(),
      team_name: "初期値チーム2",
      content: "初期値です。誰でも歓迎！",
      start_date: new Date(),
      end_date: new Date(),
      frequency_month_or_week: "週",
      frequency_day: 3,
    },
  ]);

  return (
    <>
      <div>
        <div>
          エンジニア種別：
          <select name="" id="">
            <option value="CL">CL</option>
            <option value="Web">Web</option>
            <option value="FR">FR</option>
            <option value="ML">ML</option>
            <option value="QA">QA</option>
          </select>
        </div>
        <div>
          開発期間：
          <input type="date" name="" id="" />~<input type="date" />
        </div>
        <div>
          活動頻度：
          <select>
            <option value="month">月</option>
            <option value="week">週</option>
          </select>
          <input type="number" />回
        </div>
        <button>検索</button>
      </div>
      <h1>メンバー募集一覧</h1>

      {pjList.map((project, index) => {
        const start_date = format(project.start_date, "yyyy年MM月dd日");
        const end_date = format(project.end_date, "yyyy年MM月dd日");
        return (
          <div key={project.project_id}>
            <Link to={`/PjDetail/${project.project_id}`}>
              <h2>{project.content}</h2>
              <p>チーム名：{project.team_name}</p>

              <p>
                募集エンジニア：CL({})/Web({})/FR({})/ML({})/QA({})
              </p>
              <p>
                開発期間：{start_date}~{end_date}
              </p>
              <p>
                活動頻度：{project.frequency_day}日/
                {project.frequency_month_or_week}
              </p>
            </Link>
          </div>
        );
      })}
    </>
  );
};
