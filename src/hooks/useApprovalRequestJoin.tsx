import axios from "axios";
import { useContext, useState } from "react";
import { ApprovalCountSensorContext } from "../components/providers/ApprovalCountSensorProvider";
import { FlagsContext } from "../components/providers/FlagsProvider";
import { useGetApplicantList } from "./useGetApplicantList";

export const useApprovalRequestJoin = (projectId: number) => {
  //flagsを取得する
  const flags = useContext(FlagsContext);
  if (!flags) {
    throw new Error("flagがないです");
  }
  //
  const approvalCountSensorKit = useContext(ApprovalCountSensorContext);
  if (!approvalCountSensorKit) {
    throw new Error("承認カウントセンサーがないです");
  }
  const setApprovalCountSensor = approvalCountSensorKit.setApprovalCountSensor;
  const approvalRequestJoin = async (userId: number) => {
    const res = await axios.post(
      "http://localhost:8080/jointDevelopment/projectDetail/upsert",
      {
        projectId: projectId,
        userId: userId,
        status: "belongs",
      }
    );
    setApprovalCountSensor((approvalCountSensor) => approvalCountSensor + 1);
    console.log(res);
  };

  return { approvalRequestJoin };
};
