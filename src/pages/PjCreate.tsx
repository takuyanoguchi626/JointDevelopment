/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container } from "react-bootstrap"; //2行に分割
import { Form, FormControl, InputGroup, Row } from "react-bootstrap"; //2行に分割
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RecruitLang } from "../../types/recruitLang";
import { CompNumberOfKindOfEngineerForCL } from "../components/PjCreate/CompNumberOfKindOfEngineerForCL";
import { CompNumberOfKindOfEngineerForFR } from "../components/PjCreate/CompNumberOfKindOfEngineerForFR";
import { CompNumberOfKindOfEngineerForML } from "../components/PjCreate/CompNumberOfKindOfEngineerForML";
import { CompNumberOfKindOfEngineerForQA } from "../components/PjCreate/CompNumberOfKindOfEngineerForQA";
import { CompNumberOfKindOfEngineerForWeb } from "../components/PjCreate/CompNumberOfKindOfEngineerForWeb";
import "../css/PjCreate.css";
import { useCreateProject } from "../hooks/useCreateProject";

export const PjCreate = () => {
  //React hooksの設定
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  //プロジェクト作成のカスタムフック
  const { pjCreateErrorMessage, createProject } = useCreateProject();

  //エンジニア種別ごとの希望人数
  const [numberOfKindOfEngineer, setNumberOfKindOfEngineer] =
    useState<RecruitLang>({
      langCl: 0,
      langWeb: 0,
      langFr: 0,
      langMl: 0,
      langQa: 0,
    });

  /**
   * ログインしていなかったらログイン画面へ遷移する.
   */
  useEffect(() => {
    if (!sessionStorage.getItem("loginUserId")) {
      navigate("/Login");
    }
  }, []);

  return (
    <Card>
      <Card.Header className="CardHeader" as="h5">
        プロジェクト作成
      </Card.Header>
      <Card.Body>
        <div>
          <form
            onSubmit={handleSubmit((data) => {
              createProject(data);
            })}
          >
            <Form.Label htmlFor="inputPassword5">チーム名：</Form.Label>
            <span>{errors.teamName?.message}</span>
            <Form.Control
              type="text"
              placeholder="ex)ECサイトチーム"
              {...register("teamName", {
                required: "※チーム名を入力してください",
              })}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <Form.Label htmlFor="inputPassword5">開発概要：</Form.Label>
            <span>{errors.content?.message}</span>
            <Form.Control
              type="text"
              maxLength={20}
              placeholder="ex)簡単なECサイトの開発"
              {...register("content", {
                required: "※開発概要を入力してください",
              })}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <div>
              開発内容説明（募集要項）：
              <span>{errors.contentDetail?.message}</span>
            </div>
            <InputGroup>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                maxLength={300}
                placeholder="ex)
            簡単なECサイトを開発します。
            機能としては、ログイン機能と、商品購入の一連の流れ程度を想定しています。
            追加機能は開発の進捗を見て決めていこうと思っています。
            開発にあたって、FRはreactかvueでの開発をお願いしたいです。
            WebはjavaもしくはPHPでの開発経験のある方を募集します。
            CLはこれらの言語のアプリを運用したことがある方を優先して採用します。"
                rows={4}
                {...register("contentDetail", {
                  required: "開発内容を入力してください",
                })}
              />
            </InputGroup>
            <div>
              募集エンジニア人数：
              {(() => {
                if (
                  numberOfKindOfEngineer.langCl +
                    numberOfKindOfEngineer.langWeb +
                    numberOfKindOfEngineer.langFr +
                    numberOfKindOfEngineer.langMl +
                    numberOfKindOfEngineer.langQa ===
                  0
                ) {
                  return "募集エンジニアは最低1人は入力してください。";
                }
              })()}
            </div>
            <Container>
              <Row>
                <CompNumberOfKindOfEngineerForCL
                  numberOfKindOfEngineer={numberOfKindOfEngineer}
                  setNumberOfKindOfEngineer={setNumberOfKindOfEngineer}
                  setValue={setValue}
                ></CompNumberOfKindOfEngineerForCL>
                <CompNumberOfKindOfEngineerForWeb
                  numberOfKindOfEngineer={numberOfKindOfEngineer}
                  setNumberOfKindOfEngineer={setNumberOfKindOfEngineer}
                  setValue={setValue}
                ></CompNumberOfKindOfEngineerForWeb>
                <CompNumberOfKindOfEngineerForFR
                  numberOfKindOfEngineer={numberOfKindOfEngineer}
                  setNumberOfKindOfEngineer={setNumberOfKindOfEngineer}
                  setValue={setValue}
                ></CompNumberOfKindOfEngineerForFR>
                <CompNumberOfKindOfEngineerForML
                  numberOfKindOfEngineer={numberOfKindOfEngineer}
                  setNumberOfKindOfEngineer={setNumberOfKindOfEngineer}
                  setValue={setValue}
                ></CompNumberOfKindOfEngineerForML>
                <CompNumberOfKindOfEngineerForQA
                  numberOfKindOfEngineer={numberOfKindOfEngineer}
                  setNumberOfKindOfEngineer={setNumberOfKindOfEngineer}
                  setValue={setValue}
                ></CompNumberOfKindOfEngineerForQA>
              </Row>
            </Container>
            開発期間：
            <Container>
              <Row>
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
                        validate: (value) =>
                          new Date(value) >= new Date(getValues().startDate),
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
            </Container>
            活動頻度：
            {(() => {
              if (errors.frequencyMonthOrWeek?.type === "validate") {
                return "※活動頻度を選択してください";
              }
            })()}
            {(() => {
              if (errors.frequencyDay?.type === "validate") {
                return "※活動日数を入力してください";
              }
            })()}
            <Container>
              <Row>
                <Col></Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">単位</InputGroup.Text>
                    <Form.Select
                      aria-label="Default select example"
                      {...register("frequencyMonthOrWeek", {
                        required: "活動頻度を選択してください",
                        validate: (value) => value !== "--",
                      })}
                    >
                      <option>--</option>
                      <option value="month">月</option>
                      <option value="week">週</option>
                    </Form.Select>
                  </InputGroup>
                </Col>
                <Col></Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">日数</InputGroup.Text>
                    <FormControl
                      type="number"
                      {...register("frequencyDay", {
                        required: "活動日数を入力してください",
                        validate: (value) => value !== "0",
                      })}
                      defaultValue={0}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col></Col>
              </Row>
            </Container>
            {pjCreateErrorMessage}
            <Button type="submit" value="Submit" variant="success">
              プロジェクト作成
            </Button>
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};
