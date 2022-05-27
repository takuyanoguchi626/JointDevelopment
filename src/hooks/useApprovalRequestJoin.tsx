import axios from "axios";
import { useContext } from "react";
import { FlagsContext } from "../components/providers/FlagsProvider";
import { useGetApplicantList } from "./useGetApplicantList";

export const useApprovalRequestJoin = (projectId: number) => {
  // const { setHasRequest } = useGetApplicantList(projectId);
  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  const approvalRequestJoin = async (userId: number) => {
    const res = await axios.post(
      "http://localhost:8080/jointDevelopment/projectDetail/upsert",
      {
        projectId: projectId,
        userId: userId,
        status: "belongs",
      }
    );
    flags.setHasRequest(() => false);
    console.log(res);
  };

  return { approvalRequestJoin };
};
