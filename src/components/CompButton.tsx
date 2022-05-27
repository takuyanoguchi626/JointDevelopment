import { Button } from "react-bootstrap";

export const CompButton = (props: any) => {
  return (
    <Button
      type="submit"
      value="Submit"
      variant={props.variant}
      onClick={() => {
        props.onClick(props.arg);
      }}
    >
      {props.children}
    </Button>
  );
};
