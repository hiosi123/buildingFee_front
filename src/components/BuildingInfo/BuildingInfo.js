import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BuildingInfo.css';

const BuildingInfo = () => {
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get('http://localhost:8080/bld/building/1');
        setBuilding(response.data.building);
      } catch (error) {
        console.error('Error fetching building data:', error);
      }
    };

    fetchBuilding();
  }, []);

  if (!building) {
    return <p>Loading...</p>;
  }

  return (
    <div className="building-info">
      <h2>{building.name}</h2>
      <p><strong>Owner:</strong> {building.owner}</p>
      <p><strong>Number of Floors:</strong> {building.number_floors}</p>
      <p><strong>Number of Ground Floors:</strong> {building.number_floors_ground}</p>
      <p><strong>Built At:</strong> {new Date(building.built_at).toLocaleDateString()}</p>
      <p><strong>Created At:</strong> {new Date(building.created_at).toLocaleDateString()}</p>
      <p><strong>Discarded:</strong> {building.discarded ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default BuildingInfo;
