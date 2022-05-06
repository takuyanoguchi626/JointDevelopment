import { format } from "path";
import { report } from "process";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const [langList, setLangList] = useState<Array<string | undefined>>([]);
  const [langName, setLangName] = useState<string>("");

  const addLang = () => {
    const langList2 = [...langList, langName];
    setLangList((langList) => [...langList, langName]);
    setLangName("");
    setValue("langList", langList2);
  };

  const deleteLang = (index: number) => {
    //スプレッド構文にすることで別物という認識にさせ、setLangListの時にコンポーネントをレンダリングさせる
    const langList2 = [...langList];
    langList2.splice(index, 1);
    setLangList(() => langList2);
    setValue("langList", langList2);
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <span>{errors.name?.message}</span>
        </div>
        <div>
          メールアドレス：
          <input
            {...register("Email", {
              required: "メールアドレスを入力してください",
              minLength: { value: 3, message: "文字数が足りません" },
            })}
            placeholder="Email"
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
            {...register("password", {
              required: "パスワードを入力してください",
            })}
            placeholder="password"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <span>{errors.password?.message}</span>
        </div>
        <div>
          確認用パスワード：
          <input
            {...register("confirmPassword", {
              required: "確認用パスワードを入力してください",
              validate: (value) => value === getValues().password,
            })}
            placeholder="confirmPassword"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <span>
            {(() => {
              if (errors.confirmPassword?.type === "validate") {
                return "パスワードが一致しません";
              }
            })()}
          </span>
        </div>
        <div>
          入社年月日：
          <input
            type="date"
            {...register("hireDate", {
              required: "入社日を入力してください",
              validate: (value) => new Date(value) <= new Date(),
            })}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <span>
            {(() => {
              if (errors.hireDate?.type === "validate") {
                return "入社日は今日以前の日付を入力してください";
              }
            })()}
            {errors.hireDate?.message}
          </span>
        </div>
        <div>
          現場経験：
          <input
            id="hasExp"
            type="radio"
            {...register("experience")}
            value="hasExp"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <label htmlFor="hasExp">あり</label>
          <input
            id="notHasExp"
            type="radio"
            {...register("experience")}
            value="notHasExp"
            defaultChecked
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <label htmlFor="notHasExp">なし</label>
        </div>
        <div>
          エンジニア種別：
          <select
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
          </select>
          {(() => {
            if (errors.kindOfEngineer?.type === "validate") {
              return <span>エンジニア種別を選択してください</span>;
            }
          })()}
        </div>
        <div>
          使用可能言語：
          <input
            pattern="[0-9a-z]"
            type="text"
            value={langName}
            onChange={(e) => {
              setLangName(e.target.value);
            }}
            placeholder={(() => {
              if (langList.length < 20) {
                return "残り" + (20 - langList.length) + "個";
              } else {
                return "これ以上登録できません";
              }
            })()}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          {(() => {
            let canAdd = true;
            if (langList.length < 20) {
              canAdd = false;
            }
            return (
              <>
                <button
                  type="button"
                  onClick={() => {
                    addLang();
                  }}
                  disabled={canAdd}
                >
                  追加
                </button>
              </>
            );
          })()}
          <ul>
            {langList.map((langName, index) => {
              return (
                <li key={index}>
                  {langName}
                  <button
                    type="button"
                    onClick={() => {
                      deleteLang(index);
                    }}
                  >
                    削除
                  </button>
                </li>
              );
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
