import React, { FC } from "react";
import { Button } from "react-bootstrap";
import "../../css/Button.css";

type Props = {
  variant: string;
  onClick: () => {};
  children: React.ReactNode;
};

export const ButtonAtom: FC<Props> = (props) => {
  return (
    <Button
      className="button"
      type="submit"
      value="Submit"
      variant={props.variant}
      onClick={() => {
        props.onClick();
      }}
    >
      {props.children}
    </Button>
  );
};
