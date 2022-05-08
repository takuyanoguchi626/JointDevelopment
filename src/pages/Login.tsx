import axios from "axios";
import React from "react";
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

  console.log(errors);

  /**
   * ログインする.
   *
   * @param data - ユーザーが入力したデータオブジェクト
   */
  const login = async (data: any) => {
    // const response = await axios.post("", {
    //   Email: data.Email,
    //   password: data.password,
    // });
    navigate("/PjList");
  };

  return (
    <div>
      <h1>ログイン</h1>
      <form
        onSubmit={handleSubmit((data) => {
          login(data);
        })}
      >
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
      </form>
    </div>
  );
};
