import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FloorInfo.css";

const FloorInfo = () => {
  const [floorList, setFloorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Fetch floor list
    const fetchFloorList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bld/floorList");
        setFloorList(response.data.floorList);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch floor list");
        setLoading(false);
      }
    };

    fetchFloorList();
  }, []);

  if (loading) return <p>Loading floor data...</p>;
  if (error) return <p>{error}</p>;

  const handleRowClick = (floorId, floorName) => {
    // Navigate to Charge Info page with floorId and floorName
    navigate(`/charge-info/${floorId}`, { state: { floorName } });
  };

  return (
    <div className="floor-info-container">
      <h2>All Floor Information</h2>
      <table className="floor-table">
        <thead>
          <tr>
            <th>Floor ID</th>
            <th>Floor Number</th>
            <th>Name</th>
            <th>Area</th>
            <th>Building ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {floorList.map((floor) => (
            <tr
              key={floor.id}
              onClick={() => handleRowClick(floor.id, floor.name)}
              style={{ cursor: "pointer" }}
            >
              <td>{floor.id}</td>
              <td>{floor.floor}</td>
              <td>{floor.name}</td>
              <td>{floor.area}</td>
              <td>{floor.building_id}</td>
              <td>{new Date(floor.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FloorInfo;
