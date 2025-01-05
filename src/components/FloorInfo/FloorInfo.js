import React, { useState, useEffect } from "react";
import axios from "axios";

const ChargeTable = () => {
  const [floorList, setFloorList] = useState([]);
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch floor list for the table
    const fetchFloorList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bld/floorList");
        setFloorList(response.data.floorList);
      } catch (err) {
        console.error("Failed to fetch floor list:", err);
        setError("Failed to fetch floor list.");
      }
    };

    fetchFloorList();
  }, []);

  const fetchChargeDetails = async (floor_id) => {
    try {
      const response = await axios.get(`http://localhost:8080/bld/chargeList/${floor_id}`);
      setSelectedCharge(response.data.building); // Assuming the backend returns the charge data here
      setError(null);
    } catch (err) {
      console.error("Failed to fetch charge details:", err);
      setError("Failed to fetch charge details.");
    }
  };

  return (
    <div>
      <h2>Floor List</h2>
      {error && <p className="error-message">{error}</p>}
      <table border="1">
        <thead>
          <tr>
            <th>Floor ID</th>
            <th>Floor Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {floorList.map((floor) => (
            <tr key={floor.id} onClick={() => fetchChargeDetails(floor.id)}>
              <td>{floor.id}</td>
              <td>{floor.name}</td>
              <td>
                <button onClick={(e) => { 
                  e.stopPropagation(); // Prevent row click
                  fetchChargeDetails(floor.id);
                }}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCharge && (
        <div>
          <h3>Charge Information for Floor ID: {selectedCharge.floor_id}</h3>
          <p><strong>Year:</strong> {selectedCharge.year}</p>
          <p><strong>Month:</strong> {selectedCharge.month}</p>
          <p><strong>Electric Measure:</strong> {selectedCharge.electric_measure}</p>
          <p><strong>Water Measure:</strong> {selectedCharge.water_measure}</p>
          {/* Add other fields as necessary */}
        </div>
      )}
    </div>
  );
};

export default ChargeTable;
