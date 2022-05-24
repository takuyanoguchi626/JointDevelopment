import axios from "axios";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  //useFormの定義
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let loginFalseMessage = "";

  /**
   * ログインする.
   *
   * @param data - ユーザーが入力したデータオブジェクト
   */
  const login = async (data: any) => {
    // loginFalseMessage = "";
    // const response = await axios.post(
    //   "http://localhost:8080/jointDevelopmnet/user/login",
    //   {
    //     email: data.Email,
    //     password: data.password,
    //   }
    // );
    // console.log(response);
    // if (response.status === "success") {
    //   sessionStorage.setItem("isLogin", "true");
    //   navigate("/PjList");
    // } else {
    //   loginFalseMessage =
    //     "ログインに失敗しました。メールアドレスまたはパスワードが間違っています。";
    // }
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
          <Button type="submit" value="Submit" variant="success">
            ログイン
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
};
