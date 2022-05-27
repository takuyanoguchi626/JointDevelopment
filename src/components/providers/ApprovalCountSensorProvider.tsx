import { createContext, ReactNode, useState } from "react";

type props = {
  children: ReactNode;
};

type approvalCountSensor = {
  approvalCountSensor: number;
  setApprovalCountSensor: React.Dispatch<React.SetStateAction<number>>;
};

export const ApprovalCountSensorContext =
  createContext<approvalCountSensor | null>(null);

export const ApprovalCountSensorProvider = (props: props) => {
  const { children } = props;
  const [approvalCountSensor, setApprovalCountSensor] = useState(0);
  return (
    <ApprovalCountSensorContext.Provider
      value={{ approvalCountSensor, setApprovalCountSensor }}
    >
      {children}
    </ApprovalCountSensorContext.Provider>
  );
};
