import React, { FC } from "react";
import { Button } from "react-bootstrap";
import "../../css/Button.css";

type Props = {
  variant: string;
  onClick?: () => {};
  children: React.ReactNode;
};

export const ButtonAtom: FC<Props> = (props) => {
  //   if (props.onClick !== undefined) {
  return (
    <Button
      className="button"
      type="submit"
      value="Submit"
      variant={props.variant}
      onClick={() => {
        if (props.onClick !== undefined) {
          props.onClick();
        }
      }}
    >
      {props.children}
    </Button>
  );
  //   } else {
  //     return (
  //       <Button
  //         className="button"
  //         type="submit"
  //         value="Submit"
  //         variant={props.variant}
  //       >
  //         {props.children}
  //       </Button>
  //     );
  //   }
};
