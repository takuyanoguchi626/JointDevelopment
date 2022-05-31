import React, { createContext, ReactNode, useState } from "react";

type flags = {
  isProjectCreateUser: boolean;
  setIsProjectCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
  hasRequest: boolean;
  setHasRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

type props = {
  children: ReactNode;
};

export const FlagsContext = createContext<flags | null>(null);

export const FlagsProvider: React.FC<props> = (props) => {
  const { children } = props;
  //ログイン中のユーザーが立ち上げたプロジェクトなのかのflag
  const [isProjectCreateUser, setIsProjectCreateUser] = useState(false);
  //ログイン中のユーザーがプロジェクトに参加申し込み済みかのflag
  const [hasRequest, setHasRequest] = useState(false);
  return (
    <FlagsContext.Provider
      value={{
        isProjectCreateUser,
        setIsProjectCreateUser,
        hasRequest,
        setHasRequest,
      }}
    >
      {children}
    </FlagsContext.Provider>
  );
};
