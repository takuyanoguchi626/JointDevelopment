import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCreateProject = () => {
  const navigate = useNavigate();
  const [pjCreateErrorMessage, setPjCreateErrorMessage] = useState<string>("");

  const createProject = async (project: any) => {
    setPjCreateErrorMessage("");
    if (sessionStorage.getItem("loginUserId")) {
      const res = await axios.post(
        "http://localhost:8080/jointDevelopment/project/insert",
        {
          userId: sessionStorage.getItem("loginUserId"),
          teamName: project.teamName,
          content: project.content,
          startDate: project.startDate,
          endDate: project.endDate,
          frequencyMonthOrWeek: project.frequencyMonthOrWeek,
          frequencyDay: project.frequencyDay,
          langCl: project.numberOfKindOfEngineer.langCl,
          langWeb: project.numberOfKindOfEngineer.langWeb,
          langFr: project.numberOfKindOfEngineer.langFr,
          langMl: project.numberOfKindOfEngineer.langMl,
          langQa: project.numberOfKindOfEngineer.langQa,
        }
      );
      console.log(res);

      if (res.status === 200) {
        navigate("/PjList");
      } else {
        setPjCreateErrorMessage("プロジェクト作成に失敗しました");
      }
    } else {
      navigate("/Login");
    }
  };

  return { pjCreateErrorMessage, createProject };
};
