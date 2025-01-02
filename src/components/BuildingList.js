import React from "react"

const BuildingList = ({ buildings }) => {
    return (
      <div>
        <h2>Building List</h2>
        <ul>
          {buildings.map((building) => (
            <li key={building.id}>
              <strong>{building.name}</strong> - {building.number_floors} floors
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BuildingList;
  
