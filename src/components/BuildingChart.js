import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const BuildingChart = ({ chartData }) => {
    if (!chartData) {
      return <p>Loading chart...</p>;
    }
  
    return (
      <div>
        <h2>Building Floors Chart</h2>
        <Bar data={chartData} />
      </div>
    );
  };
  
export default BuildingChart;
  