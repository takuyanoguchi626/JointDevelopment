import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";
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
    loginFalseMessage = "";
    // const response = await axios.post("", {
    //   Email: data.Email,
    //   password: data.password,
    // });
    // if (response === 0) {
    //   navigate("/PjList");
    // } else {
    //   loginFalseMessage =
    //     "ログインに失敗しました。メールアドレスまたはパスワードが間違っています。";
    // }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form
        onSubmit={handleSubmit((data) => {
          login(data);
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
        {/* <div>
          メールアドレス：
          <input
            type="text"
            placeholder="Email"
            {...register("Email", {
              required: "メールアドレスを入力してください",
            })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <span>{errors.Email?.message}</span>
        </div> */}

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
        {/* <div>
          パスワード：
          <input
            type="text"
            placeholder="password"
            {...register("password", {
              required: "パスワードを入力してください",
            })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <span>{errors.password?.message}</span>
        </div> */}
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};
