import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/PjCreate.css";

type numberOfKindOfEngineer = {
  CL: number;
  Web: number;
  FR: number;
  ML: number;
  QA: number;
};

export const PjCreate = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm();

  const [numberOfKindOfEngineer, setNumberOfKindOfEngineer] =
    useState<numberOfKindOfEngineer>({
      CL: 0,
      Web: 0,
      FR: 0,
      ML: 0,
      QA: 0,
    });

  // const data = {
  //   userId: "s",
  //   postDate: "s",
  //   teamName: "s",
  //   content: "s",
  //   startDate: "s",
  //   endDate: "s",
  //   frequencyMonth: "s",
  //   frequencyWeek: "s",
  //   frequencyDate: "s",
  //   langCl: "s",
  //   langWeb: "s",
  //   langFr: "s",
  //   langMl: "s",
  //   langQa: "s",
  // };
  //成功したら０，失敗は１が返ってくる。

  //   type data={

  //      Date postDate;
  //      String teamName;
  //    String content;
  //    Date startDate;
  //    Date endDate;
  //    Integer frequencyMonth;
  //    Integer frequencyWeek;
  //    Integer frequencyDate;
  //    Integer langCl;
  //    Integer langWeb;
  //    Integer langFr;
  //    Integer langMl;
  //    Integer langQa;
  // }

  const createProject = async (data: any) => {
    const response = await axios.post(
      "http://localhost:8080/jointDevelopmnet/project/insert",
      {
        teamName: data.teamName,
        content: data.contents,
        startDate: data.startOfDev,
        endDate: data.finishOfDev,
        frequencyMonthOrWeek: data.frequencyUnit,
        frequencyDay: data.frequencyNumber,
        langCl: data.numberOfKindOfEngineer.CL,
        langWeb: data.numberOfKindOfEngineer.Web,
        langFr: data.numberOfKindOfEngineer.FR,
        langMl: data.numberOfKindOfEngineer.ML,
        langQa: data.numberOfKindOfEngineer.QA,
      }
    );
    console.log(response);
  };

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
              // console.log(data);
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
            <span>{errors.summary?.message}</span>
            <Form.Control
              type="text"
              placeholder="ex)簡単なECサイトの開発"
              {...register("summary", {
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
              <span>{errors.contents?.message}</span>
            </div>
            <InputGroup>
              {/* <InputGroup.Text>With textarea</InputGroup.Text> */}
              <FormControl
                as="textarea"
                aria-label="With textarea"
                placeholder="ex)
            簡単なECサイトを開発します。
            機能としては、ログイン機能と、商品購入の一連の流れ程度を想定しています。
            追加機能は開発の進捗を見て決めていこうと思っています。
            開発にあたって、FRはreactかvueでの開発をお願いしたいです。
            WebはjavaもしくはPHPでの開発経験のある方を募集します。
            CLはこれらの言語のアプリを運用したことがある方を優先して採用します。"
                rows={4}
                {...register("contents", {
                  required: "開発内容を入力してください",
                })}
              />
            </InputGroup>
            <div>
              募集エンジニア人数：
              {(() => {
                if (
                  numberOfKindOfEngineer.CL +
                    numberOfKindOfEngineer.Web +
                    numberOfKindOfEngineer.FR +
                    numberOfKindOfEngineer.ML +
                    numberOfKindOfEngineer.QA ===
                  0
                ) {
                  return "募集エンジニアは最低1人は入力してください。";
                }
              })()}
            </div>
            <Container>
              <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">CL</InputGroup.Text>
                    <FormControl
                      type="number"
                      onChange={(e) => {
                        const numberOfKindOfEngineer2 = {
                          ...{
                            ...numberOfKindOfEngineer,
                            CL: Number(e.target.value),
                          },
                        };
                        setNumberOfKindOfEngineer(
                          () => numberOfKindOfEngineer2
                        );
                        setValue(
                          "numberOfKindOfEngineer",
                          numberOfKindOfEngineer2
                        );
                      }}
                      defaultValue={0}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Web</InputGroup.Text>
                    <FormControl
                      type="number"
                      onChange={(e) => {
                        const numberOfKindOfEngineer2 = {
                          ...{
                            ...numberOfKindOfEngineer,
                            Web: Number(e.target.value),
                          },
                        };
                        setNumberOfKindOfEngineer(
                          () => numberOfKindOfEngineer2
                        );
                        setValue(
                          "numberOfKindOfEngineer",
                          numberOfKindOfEngineer2
                        );
                      }}
                      defaultValue={0}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">FR</InputGroup.Text>
                    <FormControl
                      type="number"
                      onChange={(e) => {
                        const numberOfKindOfEngineer2 = {
                          ...{
                            ...numberOfKindOfEngineer,
                            FR: Number(e.target.value),
                          },
                        };
                        setNumberOfKindOfEngineer(
                          () => numberOfKindOfEngineer2
                        );
                        setValue(
                          "numberOfKindOfEngineer",
                          numberOfKindOfEngineer2
                        );
                      }}
                      defaultValue={0}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">ML</InputGroup.Text>
                    <FormControl
                      type="number"
                      onChange={(e) => {
                        const numberOfKindOfEngineer2 = {
                          ...{
                            ...numberOfKindOfEngineer,
                            ML: Number(e.target.value),
                          },
                        };
                        setNumberOfKindOfEngineer(
                          () => numberOfKindOfEngineer2
                        );
                        setValue(
                          "numberOfKindOfEngineer",
                          numberOfKindOfEngineer2
                        );
                      }}
                      defaultValue={0}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">QA</InputGroup.Text>
                    <FormControl
                      type="number"
                      onChange={(e) => {
                        const numberOfKindOfEngineer2 = {
                          ...{
                            ...numberOfKindOfEngineer,
                            QA: Number(e.target.value),
                          },
                        };
                        setNumberOfKindOfEngineer(
                          () => numberOfKindOfEngineer2
                        );
                        setValue(
                          "numberOfKindOfEngineer",
                          numberOfKindOfEngineer2
                        );
                      }}
                      defaultValue={0}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </Col>
              </Row>
            </Container>
            開発期間：
            <Container>
              <Row>
                <Col></Col>
                <Col xs={4}>
                  <span>
                    {(() => {
                      if (errors.startOfDev?.type === "validate") {
                        return "※開始日は今日以後の日付を入力してください";
                      }
                    })()}
                    {errors.startOfDev?.message}
                  </span>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">開始日</InputGroup.Text>
                    <Form.Control
                      type="date"
                      {...register("startOfDev", {
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
                      if (errors.finishOfDev?.type === "validate") {
                        return "※終了日は開始日以後の日付を入力してください";
                      }
                    })()}
                    {errors.finishOfDev?.message}
                  </span>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">終了日</InputGroup.Text>
                    <Form.Control
                      type="date"
                      {...register("finishOfDev", {
                        required: "※終了日を入力してください",
                        validate: (value) =>
                          new Date(value) >= new Date(getValues().startOfDev),
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
              if (errors.frequencyUnit?.type === "validate") {
                return "※活動頻度を選択してください";
              }
            })()}
            {(() => {
              if (errors.frequencyNumber?.type === "validate") {
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
                      {...register("frequencyUnit", {
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
                      {...register("frequencyNumber", {
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
            <Button type="submit" value="Submit" variant="success">
              プロジェクト作成
            </Button>
          </form>
        </div>
      </Card.Body>
    </Card>
  );
};
