import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PjCreate } from "./pages/PjCreate";
import { PjDetail } from "./pages/PjDetail";
import { PjList } from "./pages/PjList";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { RegisterUser } from "./pages/RegisterUser";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { MyPage } from "./pages/MyPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./css/global.css";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <div className="context">
      <BrowserRouter>
        <Header></Header>
        <Container className="my-5 mainContainer">
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Routes>
                <Route path="/" element={<PjList></PjList>}></Route>
                <Route path="/PjList" element={<PjList></PjList>}></Route>
                <Route path="/PjCreate" element={<PjCreate></PjCreate>}></Route>
                <Route
                  path="/PjDetail/:id"
                  element={<PjDetail></PjDetail>}
                ></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                <Route path="/Logout" element={<Logout></Logout>}></Route>
                <Route path="/MyPage" element={<MyPage></MyPage>}></Route>
                <Route
                  path="/UserPage/:userId"
                  element={<UserPage></UserPage>}
                ></Route>
                <Route
                  path="/RegisterUser"
                  element={<RegisterUser></RegisterUser>}
                ></Route>
              </Routes>
            </Col>
          </Row>
        </Container>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
