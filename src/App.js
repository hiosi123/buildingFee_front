import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloorInfo from "./components/FloorInfo";
import ChargeInfo from "./components/ChargeInfo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FloorInfo />} />
        <Route path="/charge-info/:floorId" element={<ChargeInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
