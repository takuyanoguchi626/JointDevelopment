import { Col, FormControl, InputGroup } from "react-bootstrap";

export const CompNumberOfKindOfEngineerForQA = (props: any) => {
  return (
    <Col>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">QA</InputGroup.Text>
        <FormControl
          type="number"
          onChange={(e) => {
            const numberOfKindOfEngineer2 = {
              ...{
                ...props.numberOfKindOfEngineer,
                langQa: Number(e.target.value),
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
