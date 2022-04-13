import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { PjCreate } from "./pages/PjCreate";
import { PjDetail } from "./pages/PjDetail";
import { PjList } from "./pages/PjList";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PjList></PjList>}></Route>
          <Route path="/PjList" element={<PjList></PjList>}></Route>
          <Route path="/PjCreate" element={<PjCreate></PjCreate>}></Route>
          <Route path="/PjDetail" element={<PjDetail></PjDetail>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
