import React from "react";
import { useForm } from "react-hook-form";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  return (
    <div>
      <h1>ログイン</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div>
          メールアドレス：
          <input
            type="text"
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
