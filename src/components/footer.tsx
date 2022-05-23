import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../css/footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <Container className="container">
        <Row className="row">
          <Col className="col Col1" md={3}>
            1 of 2
          </Col>
          <Col className="col Col2" mad={9}>
            2 of 2
          </Col>
        </Row>
      </Container>
    </div>
  );
};
