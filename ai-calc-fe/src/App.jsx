import React from "react";
import { Route, Routes } from "react-router-dom";
import Calculator from "./components/Calculator";
import Docs from "./components/Docs";
import Feedback from "./components/Feedback";
import Header from "./components/Header";
import "./index.css";
const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
};

export default App;
