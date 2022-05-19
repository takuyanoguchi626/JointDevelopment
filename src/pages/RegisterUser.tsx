import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const RegisterUser = () => {
  const navigate = useNavigate();

  //useFormの定義
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  //使用可能言語一覧
  const [langList, setLangList] = useState<Array<string | undefined>>([]);
  //使用可能言語の入力値
  const [langName, setLangName] = useState<string>("");
  //使用可能言語
  const [langNameErrorMessage, setLangNameErrorMessage] = useState("");

  /**
   * 使用可能言語一覧に言語を追加する.
   *
   */
  const addLang = () => {
    setLangNameErrorMessage("");
    if (langName.match(/[^0-9A-Za-z.+#]/)) {
      setLangNameErrorMessage("使用可能言語は半角英数字で入力してください");
      return;
    }
    const langList2 = [...langList, langName];
    setLangList((langList) => [...langList, langName]);
    setLangName("");
    setValue("langList", langList2);
  };

  /**
   *
   * @param e
   */
  const experienceChange = (e: any) => {
    let experience;
    if (e.target.value) {
      experience = "presence";
    } else {
      experience = "absence";
    }
    setValue("experience", experience);
  };

  /**
   * 使用可能言語を１つ削除する.
   *
   * @param index - 使用可能言語一覧の中の削除したい言語の添え字
   */
  const deleteLang = (index: number) => {
    //スプレッド構文にすることで別物という認識にさせ、setLangListの時にコンポーネントをレンダリングさせる
    const langList2 = [...langList];
    langList2.splice(index, 1);
    setLangList(() => langList2);
    setValue("langList", langList2);
  };
  /**
   * 会員登録をする.
   *
   * @param data - ユーザーが入力したデータオブジェクト
   */
  const registerUser = async (data: any) => {
    // const response = await axios.post("", {
    //   name: data.name,
    //   email: data.Email,
    //   password: data.password,
    //   hireDate: data.hireDate,
    //   experience: data.experience,
    //   kindOfEngineer: data.kindOfEngineer,
    //   langList: data.langList,
    // });
    navigate("/Login");
  };

  return (
    <>
      <h1>会員登録</h1>
      <form
        onSubmit={handleSubmit((data) => {
          // registerUser(data);
          console.log(data);
        })}
      >
        <Form.Label htmlFor="inputPassword5">名前</Form.Label>
        <span>※{errors.name?.message}</span>
        <Form.Control
          type="text"
          placeholder="name"
          {...register("name", {
            required: "名前を入力してください",
          })}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
            }
          }}
        />
        {/* <input
            {...register("name", {
              required: "名前を入力してください",
            })}
            placeholder="name"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          /> */}
        <Form.Label htmlFor="inputPassword5"> メールアドレス</Form.Label>
        <Form.Control
          type="text"
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
        {/* <div>
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
        </div> */}
        <Form.Label htmlFor="inputPassword5"> パスワード：</Form.Label>
        <Form.Control
          type="password"
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
        {/* <div>
          パスワード：
          <input
            type="password"
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
        </div> */}
        <Form.Label htmlFor="inputPassword5"> 確認用パスワード：</Form.Label>
        <Form.Control
          type="password"
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
        {/* <div>
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
          /> */}
        <span>
          {(() => {
            if (errors.confirmPassword?.type === "validate") {
              return "パスワードが一致しません";
            }
          })()}
        </span>
        {/* </div> */}
        <Form.Label htmlFor="inputPassword5"> 入社年月日：</Form.Label>
        <Form.Control
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
        {/* <div>
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
          /> */}
        <span>
          {(() => {
            if (errors.hireDate?.type === "validate") {
              return "入社日は今日以前の日付を入力してください";
            }
          })()}
          {errors.hireDate?.message}
        </span>
        {/* </div> */}

        <Form.Check
          type="switch"
          id="custom-switch"
          label="現場経験の有無"
          onChange={(e) => {
            experienceChange(e);
          }}
        />

        {/* <div>
          現場経験：
          <input
            id="hasExp"
            type="radio"
            {...register("experience")}
            value="presence"
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
            value="absence"
            defaultChecked
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
              }
            }}
          />
          <label htmlFor="notHasExp">なし</label>
        </div> */}

        <Form.Select
          aria-label="エンジニア種別"
          {...register("kindOfEngineer", {
            validate: (value) => value !== "--",
          })}
        >
          <option value="--" unselectable="on">
            エンジニア種別
          </option>
          <option value="CL">CL</option>
          <option value="Web">Web</option>
          <option value="FR">FR</option>
          <option value="ML">ML</option>
          <option value="QA">QA</option>
        </Form.Select>
        {/* <div>
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
          </select> */}
        {(() => {
          if (errors.kindOfEngineer?.type === "validate") {
            return <span>エンジニア種別を選択してください</span>;
          }
        })()}
        {/* </div> */}

        <Form.Label htmlFor="inputPassword5"> 使用可能言語：</Form.Label>
        <Form.Control
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

        {/* <div>
          使用可能言語：
          <input
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
          /> */}
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
        {langNameErrorMessage}
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
        {/* </div> */}
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </>
  );
};
