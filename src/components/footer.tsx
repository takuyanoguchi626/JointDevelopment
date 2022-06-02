import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../css/footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <Container className="container">
        <Row className="row">
          <Col className="col Col1" md={4}>
            <div>
              <h1>共同開発募集サイト</h1>
              <p>joint development place is here</p>
              <p className="copyright">
                Copyright © 2020 joint dev team Inc. All Rights Reserved.
              </p>
            </div>
          </Col>
          <Col className="col Col2" mad={8}>
            <div className="footerContents">
              <div>
                <h2>開発者一覧</h2>
                <div className="DeveloperList">
                  <ul>
                    <li className="engineerKinds">---Web---</li>
                    <li className="lineNone">板倉志門</li>
                    <li className="lineNone">齊藤晃夫</li>
                    <li className="engineerKinds">---FR---</li>
                    <li className="lineNone">野口拓也</li>
                  </ul>
                  <ul>
                    <li className="engineerKinds">---CL---</li>
                    <li className="lineNone">後藤大輝</li>
                    <li className="lineNone">小野桂太郎</li>
                    <li className="lineNone">丸尾勇太</li>
                    <li className="engineerKinds">---QA---</li>
                  </ul>
                </div>
              </div>
              <div className="detail">
                <h2>詳細</h2>
                <div className="DeveloperList">
                  <ul>
                    <li className="engineerKinds">---開発期間---</li>
                    <li className="lineNone">2022/04/08</li>
                    <li className="lineNone">~</li>
                    <li className="lineNone">2022/06/03</li>
                    <li className="engineerKinds">---活動頻度---</li>
                    <li className="lineNone">週１</li>
                  </ul>
                  <ul>
                    <li className="engineerKinds">---使用言語---</li>
                    <li className="lineNone">&lt;FR&gt;</li>
                    <li className="lineNone">TypeScript</li>
                    <li className="lineNone">React.js</li>
                    <li className="lineNone">&lt;Web&gt;</li>
                    <li className="lineNone">Java</li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
