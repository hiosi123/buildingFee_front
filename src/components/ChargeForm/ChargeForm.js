import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChargeForm.css";

const ChargeForm = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed

  const [floorList, setFloorList] = useState([]);
  const [formData, setFormData] = useState({
    year: currentYear,
    month: currentMonth,
    measure_number: "",
    electric_measure: "",
    water_measure: "",
    floor_id: "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloorList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/bld/floorList");
        setFloorList(response.data.floorList);
      } catch (err) {
        console.error("Failed to fetch floor list:", err);
      }
    };

    fetchFloorList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    const payload = {
      year: formData.year,
      month: formData.month,
      measure_number: parseInt(formData.measure_number, 10),
      electric_measure: parseFloat(formData.electric_measure),
      water_measure: parseFloat(formData.water_measure),
      floor_id: parseInt(formData.floor_id, 10),
    };

    try {
      const response = await axios.post("http://localhost:8080/bld/charge", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess("Charge information posted successfully!");
      setError(null);
      console.log(response.data);
    } catch (err) {
      setError("Failed to post charge information.");
      setSuccess(null);
      console.error(err);
    }
  };

  return (
    <div className="charge-form-container">
      <h2>Submit Charge Information</h2>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="charge-form">
        <label>
          Year:
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Month:
          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Measure Number:
          <input
            type="number"
            name="measure_number"
            value={formData.measure_number}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Electric Measure:
          <input
            type="number"
            step="0.01"
            name="electric_measure"
            value={formData.electric_measure}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Water Measure:
          <input
            type="number"
            step="0.01"
            name="water_measure"
            value={formData.water_measure}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Floor ID:
          <select
            name="floor_id"
            value={formData.floor_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Floor</option>
            {floorList.map((floor) => (
              <option key={floor.id} value={floor.id}>
                {floor.id} - {floor.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ChargeForm;
