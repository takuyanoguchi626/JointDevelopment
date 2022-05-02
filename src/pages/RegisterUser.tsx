import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const RegisterUser = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  console.log(errors);

  const [langList, setLangList] = useState<Array<string | undefined>>([]);
  const [langName, setLangName] = useState<string>("");

  const addLang = () => {
    setLangList((langList) => [...langList, langName]);
    setLangName("");
  };
  return (
    <>
      <h1>会員登録</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div>
          名前：
          <input
            {...register("name", { required: "名前を入力してください" })}
            placeholder="name"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          メールアドレス：
          <input
            {...register("Email", {
              required: "メールアドレスを入力してください",
              minLength: { value: 3, message: "文字数が足りません" },
            })}
            placeholder="Email"
          />
          <p>{errors.Email?.message}</p>
        </div>
        <div>
          パスワード：
          <input
            {...register("password", {
              required: "パスワードを入力してください",
            })}
            placeholder="password"
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          確認用パスワード：
          <input
            {...register("confirmPassword", {
              required: "確認用パスワードを入力してください",
              validate: (value) => value === getValues().password,
            })}
            placeholder="confirmPassword"
          />
          <div>
            {(() => {
              if (errors.confirmPassword?.type === "validate") {
                return <p>パスワードが一致しません</p>;
              }
            })()}
          </div>
        </div>
        <div>
          入社年月日：
          <input
            type="date"
            {...register("hireDate", {
              required: "入社日を入力してください",
              validate: (value) => new Date(value) <= new Date(),
            })}
          />
          <div>
            {(() => {
              if (errors.hireDate?.type === "validate") {
                return <p>入社日は今日以前の日付を入力してください</p>;
              }
            })()}
          </div>
        </div>
        <div>
          現場経験：
          <input
            id="hasExp"
            type="radio"
            {...register("experience")}
            value="hasExp"
          />
          <label htmlFor="hasExp">あり</label>
          <input
            id="notHasExp"
            type="radio"
            {...register("experience")}
            value="notHasExp"
            defaultChecked
          />
          <label htmlFor="notHasExp">なし</label>
        </div>
        <div>
          エンジニア種別：
          <select name="" id="">
            <option value="" unselectable="on">
              --
            </option>
            <option value="CL">CL</option>
            <option value="Web">Web</option>
            <option value="FR">FR</option>
            <option value="ML">ML</option>
            <option value="QA">QA</option>
          </select>
        </div>
        <div>
          使用可能言語：
          <input
            type="text"
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
          />
          <button onClick={() => addLang()}>追加</button>
          <ul>
            {langList.map((langName, index) => {
              return <li key={index}>{langName}</li>;
            })}
          </ul>
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </>
  );
};
