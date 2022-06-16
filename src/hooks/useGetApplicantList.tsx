import axios from "axios";
import { useContext, useState } from "react";
import { ProjectUser } from "../../types/ProjectUser";
import { FlagsContext } from "../components/providers/FlagsProvider";

export const useGetApplicantList = (projectId: number) => {
  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  //プロジェクトへの参加申請者一覧
  const [applicantList, setApplicantList] = useState<Array<ProjectUser>>([
    {
      userId: 0,
      name: "",
      engineerKinds: "",
    },
  ]);
  /**
   * 参加申し込みをしているユーザーの一覧を取得する.
   */
  const getApplicantList = async () => {
    const res = await axios.get(
      `http://localhost:8080/jointDevelopment/pjManagement/applicant/?projectId=${projectId}`
    );
    if (flags.isProjectCreateUser) {
      setApplicantList(() => res.data);
    } else {
      for (const applicant of res.data) {
        if (
          Number(applicant.userId) ===
          Number(sessionStorage.getItem("loginUserId"))
        ) {
          flags.setHasRequest(() => true);
        }
      }
    }
  };
  return { applicantList, getApplicantList };
};
