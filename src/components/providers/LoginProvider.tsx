import React, { createContext, ReactNode, useState } from "react";

// propsの型定義
type props = {
  children: ReactNode;
};

type login = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginContext = createContext<login | null>(null);

export const LoginProvider: React.FC<props> = (props) => {
  const { children } = props;

  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
