import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../css/PjList.css";
import { Project } from "../../types/Project";
import { format } from "date-fns";
import { Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { ButtonAtom } from "../components/atoms/Button";
import { useGetProjectList } from "../hooks/useGetProjectList";

export const PjList = () => {
  //useFormの定義
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { pjList, getProjectList } = useGetProjectList();

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      {/* 検索機能 */}
      <Card>
        <Card.Header as="h5" className="CardHeader">
          プロジェクト検索
        </Card.Header>
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
            <Row className="mt-3">
              <Col></Col>
              <Col xs={4}>
                <span>
                  {(() => {
                    if (errors.startDate?.type === "validate") {
                      return "※開始日は今日以後の日付を入力してください";
                    }
                  })()}
                  {errors.startDate?.message}
                </span>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">開始日</InputGroup.Text>
                  <Form.Control
                    type="date"
                    {...register("startDate", {
                      required: "※開始日を入力してください",
                      validate: (value) => new Date(value) >= new Date(),
                    })}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                      }
                    }}
                  />
                </InputGroup>
              </Col>
              <Col className="naminami">~</Col>
              <Col xs={4}>
                <span>
                  {(() => {
                    if (errors.endDate?.type === "validate") {
                      return "※終了日は開始日以後の日付を入力してください";
                    }
                  })()}
                  {errors.endDate?.message}
                </span>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">終了日</InputGroup.Text>
                  <Form.Control
                    type="date"
                    {...register("endDate", {
                      required: "※終了日を入力してください",
                      // validate: (value) =>
                      //   new Date(value) >= new Date(getValues().startDate),
                    })}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                      }
                    }}
                  />
                </InputGroup>
              </Col>
              <Col></Col>
            </Row>
            <div>活動頻度：</div>
            <Form.Select
              aria-label="活動頻度"
              {...register("kindOfEngineer", {
                validate: (value) => value !== "--",
              })}
            >
              <option value="--" unselectable="on">
                --
              </option>
              <option value="month">月</option>
              <option value="week">週</option>
            </Form.Select>
            <Form.Control
              className="mt-3"
              type="text"
              placeholder="回数"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <ButtonAtom variant="success">検索</ButtonAtom>
          </form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header className="CardHeader" as="h5">
          メンバー募集一覧
        </Card.Header>
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
                  <Card
                    style={{ width: "18rem" }}
                    key={index}
                    className="mb-4 mt-4 card"
                  >
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
                          募集エンジニア：CL({project.recruitLang.langCl})/Web(
                          {project.recruitLang.langWeb})/FR(
                          {project.recruitLang.langFr}
                          )/ML({project.recruitLang.langMl})/QA(
                          {project.recruitLang.langQa})
                          <br />
                          <br />
                          開発期間：
                          <br />
                          {startDate}~{endDate}
                          <br />
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
