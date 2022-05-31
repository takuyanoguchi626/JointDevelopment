import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FlagsContext } from "../components/providers/FlagsProvider";

export const usePostRequestChoice = (projectId: number) => {
  //React hooksの設定
  const navigate = useNavigate();
  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  /**
   * プロジェクトへの参加申請または参加申請取り消しをする.
   *
   * @param choice pending or cancel
   */
  const postRequestChoice = async (choice: string) => {
    if (sessionStorage.getItem("loginUserId")) {
      await axios.post(
        "http://localhost:8080/jointDevelopment/projectDetail/upsert",
        {
          projectId: projectId,
          userId: sessionStorage.getItem("loginUserId"),
          status: choice,
        }
      );
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
