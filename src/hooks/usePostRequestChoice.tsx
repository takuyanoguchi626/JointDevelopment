import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FlagsContext } from "../components/providers/FlagsProvider";
import { useGetApplicantList } from "./useGetApplicantList";

export const usePostRequestChoice = (projectId: number) => {
  const navigate = useNavigate();

  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }

  // //ログインユーザーが参加申し込みを申請済みかのset関数を取得する
  // const { setHasRequest } = useGetApplicantList(projectId);

  const postRequestChoice = async (choice: string) => {
    if (sessionStorage.getItem("loginUserId")) {
      const res = await axios.post(
        "http://localhost:8080/jointDevelopment/projectDetail/upsert",
        {
          projectId: projectId,
          userId: sessionStorage.getItem("loginUserId"),
          status: choice,
        }
      );
      console.log(res);
      if (choice === "pending") {
        flags.setHasRequest(() => true);
      } else if (choice === "cancel") {
        flags.setHasRequest(() => false);
      }
    } else {
      navigate("/Login");
    }
  };
  return { postRequestChoice };
};
