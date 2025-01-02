import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Replace with your backend URL

export const fetchBuildings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bld/building/1`);
    let building = response.data["building"]
    console.log(building)
    return [building];
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw error;
  }
};
