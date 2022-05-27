import { useState } from "react";
import { useGetProjectDetail } from "./useGetProjectDetail";

export const useGetRecruitRatio = (projectId: number) => {
  const { project } = useGetProjectDetail(projectId);

  //現在の募集状況のパーセンテージ
  const [recruitRatio, setRecruitRatio] = useState<number>(0);

  const totalRecruitLangNumber =
    Number(project.recruitLang.langCl) +
    Number(project.recruitLang.langWeb) +
    Number(project.recruitLang.langFr) +
    Number(project.recruitLang.langMl) +
    Number(project.recruitLang.langQa);

  const recruitRatioSetter = () => {
    setRecruitRatio(
      () => (project.projectUserList?.length / totalRecruitLangNumber) * 100
    );
  };

  return { recruitRatio, recruitRatioSetter };
};
