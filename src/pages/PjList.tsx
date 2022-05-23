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
  useEffect(() => {
    const axiosGet = async () => {
      const response = await axios.get(
        "http://localhost:8080/jointDevelopmnet/findProject/findProjectList"
      );
      console.log(response.data);
      setPjList(response.data);
    };
    axiosGet();
  }, []);

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
      userId: 0, //投稿者
      postDate: "string",
      teamName: "string",
      content: "string",
      startDate: "1111-11-11",
      endDate: "1111-11-11",
      frequencyMonthOrWeek: "string",
      frequencyDay: 0,
      projectUserList: [0],
      contentDetail: "string",
    },
  ]);

  console.dir(pjList[0].startDate);

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
                const startDate = format(
                  new Date(project.startDate),
                  "yyyy年MM月dd日"
                );
                const endDate = format(
                  new Date(project.endDate),
                  "yyyy年MM月dd日"
                );
                return (
                  <Card style={{ width: "18rem" }} key={project.projectId}>
                    <Link
                      className="link"
                      to={`/PjDetail/${project.projectId}`}
                    >
                      <Card.Body>
                        <Card.Title>{project.content}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          チーム名：{project.teamName}
                        </Card.Subtitle>
                        <hr />
                        <Card.Text>
                          募集エンジニア：CL({1})/Web({4})/FR({4})/ML({4})/QA(
                          {4})
                          <br />
                          開発期間：
                          <br />
                          {startDate}~{endDate}
                          <br />
                          活動頻度：{project.frequencyDay}日/
                          {project.frequencyMonthOrWeek}
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
