import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewUser from "./AddNewUser";
import GetUser from "./GetUser";
import "./App.css";

function App() {
  return (
    <>
      <h1>Welcome To User List</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetUser />}></Route>
          <Route path="/add_user" element={<AddNewUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
