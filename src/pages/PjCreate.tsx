import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

  return (
    <div>
      <h1>プロジェクト作成</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div>
          チーム名：
          <input
            placeholder="ex)ECサイトチーム"
            type="text"
            {...register("teamName", {
              required: "チーム名を入力してください",
            })}
          />
        </div>
        <div>
          開発概要：
          <input
            placeholder="ex)簡単なECサイトの開発"
            type="text"
            {...register("summary", {
              required: "開発概要を入力してください",
            })}
          />
        </div>
        <div>
          <div>開発内容説明（募集要項）：</div>
          <textarea
            placeholder="ex)
            簡単なECサイトを開発します。
            機能としては、ログイン機能と、商品購入の一連の流れ程度を想定しています。
            追加機能は開発の進捗を見て決めていこうと思っています。
            開発にあたって、FRはreactかvueでの開発をお願いしたいです。
            WebはjavaもしくはPHPでの開発経験のある方を募集します。
            CLはこれらの言語のアプリを運用したことがある方を優先して採用します。"
            cols={30}
            rows={10}
            {...register("contents", {
              required: "開発内容を入力してください",
            })}
          ></textarea>
        </div>
        <div>
          募集エンジニア人数：
          <div>
            CL:
            <input
              defaultValue={0}
              type="number"
              onChange={(e) => {
                const numberOfKindOfEngineer2 = {
                  ...{
                    ...numberOfKindOfEngineer,
                    CL: Number(e.target.value),
                  },
                };
                setNumberOfKindOfEngineer(() => numberOfKindOfEngineer2);
                setValue("numberOfKindOfEngineer", numberOfKindOfEngineer2);
              }}
            />
            人
          </div>
          <div>
            Web:
            <input
              defaultValue={0}
              type="number"
              onChange={(e) => {
                const numberOfKindOfEngineer2 = {
                  ...{
                    ...numberOfKindOfEngineer,
                    Web: Number(e.target.value),
                  },
                };
                setNumberOfKindOfEngineer(() => numberOfKindOfEngineer2);
                setValue("numberOfKindOfEngineer", numberOfKindOfEngineer2);
              }}
            />
            人
          </div>
          <div>
            FR:
            <input
              defaultValue={0}
              type="number"
              onChange={(e) => {
                const numberOfKindOfEngineer2 = {
                  ...{
                    ...numberOfKindOfEngineer,
                    FR: Number(e.target.value),
                  },
                };
                setNumberOfKindOfEngineer(() => numberOfKindOfEngineer2);
                setValue("numberOfKindOfEngineer", numberOfKindOfEngineer2);
              }}
            />
            人
          </div>
          <div>
            ML:
            <input
              defaultValue={0}
              type="number"
              onChange={(e) => {
                const numberOfKindOfEngineer2 = {
                  ...{
                    ...numberOfKindOfEngineer,
                    ML: Number(e.target.value),
                  },
                };
                setNumberOfKindOfEngineer(() => numberOfKindOfEngineer2);
                setValue("numberOfKindOfEngineer", numberOfKindOfEngineer2);
              }}
            />
            人
          </div>
          <div>
            QA:
            <input
              defaultValue={0}
              type="number"
              onChange={(e) => {
                const numberOfKindOfEngineer2 = {
                  ...{
                    ...numberOfKindOfEngineer,
                    QA: Number(e.target.value),
                  },
                };
                setNumberOfKindOfEngineer(() => numberOfKindOfEngineer2);
                setValue("numberOfKindOfEngineer", numberOfKindOfEngineer2);
              }}
            />
            人
          </div>
        </div>
        <div>
          開発期間：
          <input
            type="date"
            {...register("startOfDev", {
              required: "開発の開始日を入力してください",
            })}
          />
          ~
          <input
            type="date"
            {...register("finishOfDev", {
              required: "開発の終了日を入力してください",
            })}
          />
        </div>
        <div>
          活動頻度：
          <select
            {...register("frequencyUnit", {
              required: "活動頻度を入力してください",
            })}
          >
            <option value="month">月</option>
            <option value="week">週</option>
          </select>
          <input
            type="number"
            placeholder="frequencyNumber"
            {...register("frequencyNumber", {
              required: "回数を入力してください",
            })}
          />
          回
        </div>
        <div>
          <button type="submit">プロジェクト作成</button>
        </div>
      </form>
    </div>
  );
};
