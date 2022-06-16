import axios from "axios";
import { useState } from "react";
import { Project } from "../../types/Project";

export const useGetProjectList = () => {
  //プロジェクト一覧
  const [pjList, setPjList] = useState<Array<Project>>([
    {
      userId: 0,
      postDate: "string",
      teamName: "ECサイトチーム",
      content: "簡単なECサイトを開発します！",
      startDate: "1111-11-11",
      endDate: "1111-11-11",
      frequencyMonthOrWeek: "string",
      frequencyDay: 0,
      projectUserList: [{ userId: 0, name: "", engineerKinds: "" }],
      contentDetail: "string",
      recruitLang: {
        langCl: 1,
        langWeb: 1,
        langFr: 1,
        langMl: 1,
        langQa: 1,
      },
    },
  ]);

  const getProjectList = async () => {
    const response = await axios.get(
      "http://localhost:8080/jointDevelopment/findProject/findProjectList"
    );
    setPjList(response.data);
  };

  return {
    pjList,
    setPjList,
    getProjectList,
  };
};
