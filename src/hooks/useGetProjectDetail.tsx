import axios from "axios";
import { useContext, useState } from "react";
import { Project } from "../../types/Project";
import { FlagsContext } from "../components/providers/FlagsProvider";

export const useGetProjectDetail = (projectId: number) => {
  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  //プロジェクト詳細情報
  const [project, setProject] = useState<Project>({
    userId: 0, //投稿者
    postDate: "1111-11-11",
    teamName: "ECサイトチーム",
    content: "簡単なECサイトを開発します！",
    startDate: "1111-11-11",
    endDate: "1111-11-11",
    frequencyMonthOrWeek: "string",
    frequencyDay: 0,
    contentDetail: "string",
    recruitLang: {
      langCl: 1,
      langWeb: 1,
      langFr: 1,
      langMl: 1,
      langQa: 3,
    },
    projectUserList: [],
  });
  /**
   * プロジェクト詳細を取得する.
   */
  const getProjectDetail = async () => {
    const res = await axios.get(
      `http://localhost:8080/jointDevelopment/findProject/detail/?projectId=${projectId}`
    );
    setProject(() => res.data);
    console.log(res);

    if (res.data.userId === Number(sessionStorage.getItem("loginUserId"))) {
      flags.setIsProjectCreateUser(() => true);
    }
    for (const projectUser of res.data.projectUserList) {
      if (
        projectUser.userId === Number(sessionStorage.getItem("loginUserId"))
      ) {
        flags.setIsJoinUser(() => true);
      }
    }
  };
  return { project, getProjectDetail };
};
