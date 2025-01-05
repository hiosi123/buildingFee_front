import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const ChargeInfo = () => {
  const { floorId } = useParams(); // Get floor ID from URL
  const location = useLocation(); // Get floorName from state
  const { floorName } = location.state || {}; // Extract floorName
  const [chargeData, setChargeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch charge data for the given floor ID
    const fetchChargeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/bld/chargeList/${floorId}`);
        setChargeData(response.data.building); // Update with API response
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch charge data");
        setLoading(false);
      }
    };

    fetchChargeData();
  }, [floorId]);

  if (loading) return <p>Loading charge data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="charge-info-container">
      <h2>Charge Information</h2>
      <h3>Floor: {floorName}</h3>
      <ul>
        <li><strong>Year:</strong> {chargeData.year}</li>
        <li><strong>Month:</strong> {chargeData.month}</li>
        <li><strong>Electric Difference:</strong> {chargeData.electric_difference}</li>
        <li><strong>Water Difference:</strong> {chargeData.water_difference}</li>
      </ul>
    </div>
  );
};

export default ChargeInfo;
