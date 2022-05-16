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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<PjList></PjList>}></Route>
          <Route path="/PjList" element={<PjList></PjList>}></Route>
          <Route path="/PjCreate" element={<PjCreate></PjCreate>}></Route>
          <Route path="/PjDetail/:id" element={<PjDetail></PjDetail>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Logout" element={<Logout></Logout>}></Route>
          <Route path="/MyPage" element={<MyPage></MyPage>}></Route>
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
