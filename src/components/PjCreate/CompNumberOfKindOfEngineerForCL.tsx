import { Col, FormControl, InputGroup } from "react-bootstrap";

export const CompNumberOfKindOfEngineerForCL = (props: any) => {
  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">CL</InputGroup.Text>
        <FormControl
          type="number"
          onChange={(e) => {
            const numberOfKindOfEngineer2 = {
              ...{
                ...props.numberOfKindOfEngineer,
                langCl: Number(e.target.value),
              },
            };
            props.setNumberOfKindOfEngineer(() => numberOfKindOfEngineer2);
            props.setValue("numberOfKindOfEngineer", numberOfKindOfEngineer2);
          }}
          defaultValue={0}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </Col>
  );
};
