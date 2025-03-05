import React from "react";
import { Route, Routes } from "react-router-dom";
import Calculator from "./components/Calculator";
import Docs from "./components/Docs";
import Header from "./components/Header";
import "./index.css";
const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </div>
  );
};

export default App;
