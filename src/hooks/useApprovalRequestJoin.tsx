import axios from "axios";
import { useContext } from "react";
import { ApprovalCountSensorContext } from "../components/providers/ApprovalCountSensorProvider";
import { FlagsContext } from "../components/providers/FlagsProvider";

export const useApprovalRequestJoin = (projectId: number) => {
  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  //承認カウントセンサーのsetterを取得する
  const approvalCountSensorKit = useContext(ApprovalCountSensorContext);
  if (!approvalCountSensorKit) {
    throw new Error("承認カウントセンサーがないです");
  }
  const setApprovalCountSensor = approvalCountSensorKit.setApprovalCountSensor;
  /**
   * 参加申請を承認する.
   *
   * @param userId 参加申請をしてきたユーザーのユーザーID
   */
  const approvalRequestJoin = async (userId: number) => {
    await axios.post(
      "http://localhost:8080/jointDevelopment/projectDetail/upsert",
      {
        projectId: projectId,
        userId: userId,
        status: "belongs",
      }
    );
    setApprovalCountSensor((approvalCountSensor) => approvalCountSensor + 1);
  };
  return { approvalRequestJoin };
};
