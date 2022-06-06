import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ButtonAtom } from "../components/atoms/Button";

export const Login = () => {
  const navigate = useNavigate();

  //useFormの定義
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginFalseMessage, setLoginFalseMessage] = useState("");

  /**
   * ログインする.
   *
   * @param data - ユーザーが入力したデータオブジェクト
   */
  const login = async (data: any) => {
    setLoginFalseMessage("");
    const response = await axios.post(
      "http://localhost:8080/jointDevelopment/user/login",
      {
        email: data.Email,
        password: data.password,
      }
    );
    console.log(response);
    if (response.data !== "") {
      sessionStorage.setItem("loginUserId", response.data.userId);
      navigate("/PjList");
    } else {
      setLoginFalseMessage(
        "ログインに失敗しました。メールアドレスまたはパスワードが間違っています。"
      );
    }
  };

  return (
    <Card>
      <Card.Header className="CardHeader" as="h5">
        ログイン
      </Card.Header>
      <Card.Body>
        <form
          onSubmit={handleSubmit((data) => {
            login(data);
            console.log(data);
          })}
        >
          <div>{loginFalseMessage}</div>
          <Form.Label htmlFor="inputPassword5"> メールアドレス：</Form.Label>
          <span>{errors.Email?.message}</span>
          <Form.Control
            type="text"
            {...register("Email", {
              required: "※メールアドレスを入力してください",
              minLength: { value: 3, message: "文字数が足りません" },
            })}
            placeholder="Email"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <Form.Label htmlFor="inputPassword5"> パスワード：</Form.Label>
          <span>{errors.password?.message}</span>
          <Form.Control
            type="password"
            {...register("password", {
              required: "※パスワードを入力してください",
            })}
            placeholder="password"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <ButtonAtom variant="success">ログイン</ButtonAtom>
        </form>
      </Card.Body>
    </Card>
  );
};
