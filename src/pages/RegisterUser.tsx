import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, InputGroup, ListGroup, Card } from "react-bootstrap";
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

  useEffect(() => {
    setValue("experience", "absence");
  }, []);

  /**
   *現場経験の有無を変更する.
   *
   * @param e - HTMLの要素
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

  //使用可能言語一覧
  const [langList, setLangList] = useState<Array<string | undefined>>([]);
  //使用可能言語の入力値
  const [langName, setLangName] = useState<string>("");
  //使用可能言語の入力値エラー
  const [langNameErrorMessage, setLangNameErrorMessage] = useState("");
  //使用可能言語が1つもない時のエラー
  const [langListErrorMessage, setLangListErrorMessage] = useState("");

  /**
   * 使用可能言語一覧に言語を追加する.
   *
   */
  const addLang = () => {
    setLangNameErrorMessage("");
    if (langName.match(/[^0-9A-Za-z.+#]/)) {
      setLangNameErrorMessage("※使用可能言語は半角英数字で入力してください");
      return;
    }
    const langList2 = [...langList, langName];
    setLangList((langList) => [...langList, langName]);
    setLangName("");
    setValue("langList", langList2);
    langListChecker(langList2);
  };

  /**
   * 使用可能言語が1つもないかどうかのチェック.
   *
   * @params langList - 使用可能言語一覧
   */
  const langListChecker = (langList: Array<string | undefined>) => {
    setLangListErrorMessage("");
    if (langList.length === 0) {
      setLangListErrorMessage("使用可能言語は最低1つは入力してください。");
    }
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
    langListChecker(langList2);
  };

  let registerUserErrorMessage;

  /**
   * 会員登録をする.
   *
   * @param data - ユーザーが入力したデータオブジェクト
   */
  const registerUser = async (data: any) => {
    console.log(data);

    registerUserErrorMessage = "";
    const response = await axios.post(
      "http://localhost:8080/jointDevelopment/user/register",
      {
        name: data.name,
        email: data.Email,
        password: data.password,
        joiningDate: data.hireDate,
        experience: data.experience,
        engineerKinds: data.kindOfEngineer,
        otherAvailableLang: data.langList,
      }
    );
    console.log(response);
    const status = response.status;
    if (status === 200) {
      navigate("/Login");
    } else {
      registerUserErrorMessage = "会員登録に失敗しました";
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="CardHeader" as="h5">
          会員登録
        </Card.Header>
        <Card.Body>
          <form
            onSubmit={handleSubmit((data) => {
              registerUser(data);
            })}
          >
            <Form.Label htmlFor="inputPassword5">名前：</Form.Label>
            <span>{errors.name?.message}</span>
            <Form.Control
              type="text"
              placeholder="name"
              {...register("name", {
                required: "※名前を入力してください",
              })}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <Form.Label htmlFor="inputPassword5"> メールアドレス：</Form.Label>
            <span>{errors.Email?.message}</span>
            <Form.Control
              type="email"
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
                minLength: 8,
                maxLength: 16,
                required: "※パスワードを入力してください",
              })}
              placeholder="password"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <Form.Label htmlFor="inputPassword5">
              {" "}
              確認用パスワード：
            </Form.Label>
            <span>
              {(() => {
                if (errors.confirmPassword?.type === "validate") {
                  return "※パスワードが一致しません";
                }
              })()}
            </span>
            <Form.Control
              type="password"
              {...register("confirmPassword", {
                required: "※確認用パスワードを入力してください",
                validate: (value) => value === getValues().password,
              })}
              placeholder="confirmPassword"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <Form.Label htmlFor="inputPassword5"> 入社年月日：</Form.Label>
            <span>
              {(() => {
                if (errors.hireDate?.type === "validate") {
                  return "※入社日は今日以前の日付を入力してください";
                }
              })()}
              {errors.hireDate?.message}
            </span>
            <Form.Control
              type="date"
              {...register("hireDate", {
                required: "※入社日を入力してください",
                validate: (value) => new Date(value) <= new Date(),
              })}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); //デフォルトのイベントをプリベント（妨げる）する
                }
              }}
            />
            <Form.Check
              type="switch"
              id="custom-switch"
              label="現場経験の有無"
              onChange={(e) => {
                experienceChange(e);
              }}
            />
            エンジニア種別：
            {(() => {
              if (errors.kindOfEngineer?.type === "validate") {
                return <span>※エンジニア種別を選択してください</span>;
              }
            })()}
            <Form.Select
              aria-label="エンジニア種別"
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
            </Form.Select>
            使用可能言語：{langNameErrorMessage}
            {langListErrorMessage}
            <InputGroup className="mb-3">
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
                    if (langName) {
                      addLang();
                    }
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
                    <Button
                      variant="primary"
                      type="button"
                      onClick={() => {
                        if (langName) {
                          addLang();
                        }
                      }}
                      disabled={canAdd}
                    >
                      追加
                    </Button>
                  </>
                );
              })()}
            </InputGroup>
            <ListGroup variant="flush">
              {langList.map((langName, index) => {
                return (
                  <ListGroup.Item key={index}>
                    {langName}
                    <Button
                      variant="danger"
                      type="button"
                      onClick={() => {
                        deleteLang(index);
                      }}
                    >
                      削除
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            {registerUserErrorMessage}
            <Button
              type="submit"
              value="Submit"
              variant="success"
              onClick={() => langListChecker(langList)}
            >
              登録
            </Button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};
