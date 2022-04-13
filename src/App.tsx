import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PjCreate } from "./pages/PjCreate";
import { PjDetail } from "./pages/PjDetail";
import { PjList } from "./pages/PjList";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PjList></PjList>}></Route>
          <Route path="/PjList" element={<PjList></PjList>}></Route>
          <Route path="/PjCreate" element={<PjCreate></PjCreate>}></Route>
          <Route path="/PjDetail" element={<PjDetail></PjDetail>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
