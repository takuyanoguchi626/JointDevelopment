import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PjCreate } from "./pages/PjCreate";
import { PjDetail } from "./pages/PjDetail";
import { PjList } from "./pages/PjList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RegisterUser } from "./pages/RegisterUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<PjList></PjList>}></Route>
          <Route path="/PjList" element={<PjList></PjList>}></Route>
          <Route path="/PjCreate" element={<PjCreate></PjCreate>}></Route>
          <Route path="/PjDetail" element={<PjDetail></PjDetail>}></Route>
          <Route
            path="/RegisterUser"
            element={<RegisterUser></RegisterUser>}
          ></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
