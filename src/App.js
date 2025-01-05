import React from "react";
import BuildingInfo from "./components/BuildingInfo/BuildingInfo";
import FloorInfo from "./components/FloorInfo/FloorInfo";
import ChargeForm from "./components/ChargeForm/ChargeForm";

const App = () => {
  return (
    <div>
      <h1>Building Management System</h1>
      <BuildingInfo />
      <FloorInfo />
      <ChargeForm />
    </div>
  );
};

export default App;
