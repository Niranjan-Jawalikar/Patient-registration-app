import React, { useEffect, useState } from "react";
import { getPatients, insertPatient } from "../../database/Patient";
import { useNavigate } from "react-router-dom";
import "./PatientForm.scss";
import { useLiveIncrementalQuery } from "@electric-sql/pglite-react";

const PatientForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertPatient({
        ...formData,
        age: parseInt(formData.age, 10),
      });
      alert("Patient added successfully!");
      setFormData({
        name: "",
        age: "",
        gender: "",
        diagnosis: "",
        address: "",
      });
      navigate("/"); // Redirect to the patient list
    } catch (err) {
      console.error("Error inserting patient:", err);
      alert("Failed to add patient.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <h2>Add Patient</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input
        type="text"
        name="diagnosis"
        placeholder="Diagnosis"
        value={formData.diagnosis}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;
