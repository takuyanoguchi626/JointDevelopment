import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../css/PjList.css";
import { Project } from "../../types/Project";
import { format } from "date-fns";
import { Card, Form } from "react-bootstrap";

export const PjList = () => {
  //プロジェクト一覧をDBから取得する
  // useEffect(() => {
  //   let response;
  //   const axiosGet = async () => {
  //     response = await axios.get("");
  //   };
  //   axiosGet();
  // }, []);

  //useFormの定義
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

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
      <Card>
        <Card.Header as="h5">プロジェクト検索</Card.Header>
        <Card.Body>
          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div>
              エンジニア種別：
              {(() => {
                if (errors.kindOfEngineer?.type === "validate") {
                  return <span>※エンジニア種別を選択してください</span>;
                }
              })()}
              <Form.Select
                aria-label="エンジニア種別"
                {...register("kindOfEngineer", {
                  validate: (value) => value !== "--",
                })}
              >
                <option value="--" unselectable="on">
                  --
                </option>
                <option value="CL">CL</option>
                <option value="Web">Web</option>
                <option value="FR">FR</option>
                <option value="ML">ML</option>
                <option value="QA">QA</option>
              </Form.Select>
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
          </form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h5">メンバー募集一覧</Card.Header>
        <Card.Body>
          <div className="PjListContainer">
            <div className="pjListMap">
              {pjList.map((project, index) => {
                const start_date = format(project.start_date, "yyyy年MM月dd日");
                const end_date = format(project.end_date, "yyyy年MM月dd日");
                return (
                  <Card style={{ width: "18rem" }} key={project.project_id}>
                    <Link
                      className="link"
                      to={`/PjDetail/${project.project_id}`}
                    >
                      <Card.Body>
                        <Card.Title>{project.content}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          チーム名：{project.team_name}
                        </Card.Subtitle>
                        <hr />
                        <Card.Text>
                          募集エンジニア：CL({1})/Web({4})/FR({4})/ML({4})/QA(
                          {4})
                          <br />
                          開発期間：
                          <br />
                          {start_date}~{end_date}
                          <br />
                          活動頻度：{project.frequency_day}日/
                          {project.frequency_month_or_week}
                          <br />
                        </Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
