import React, { useEffect, useState } from "react";
import { fetchBuildings } from "../services/api";
import BuildingList from "../components/BuildingList";
import BuildingChart from "../components/BuildingChart";

const HomePage = () => {
  const [buildings, setBuildings] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadBuilding = async () => {
      try {
        const data = await fetchBuildings(); // Returns an array with one object
        const building = data[0];
  
        setChartData({
          labels: [building.name], // Single label for the chart
          datasets: [
            {
              label: "Number of Floors",
              data: [building.number_floors], // Single data point
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error loading building data:", error);
      }
    };
  
    loadBuilding();
  }, []);
  

  return (
    <div>
      <h1>Building Management</h1>
      <BuildingList buildings={buildings} />
      <BuildingChart chartData={chartData} />
    </div>
  );
};

export default HomePage;
