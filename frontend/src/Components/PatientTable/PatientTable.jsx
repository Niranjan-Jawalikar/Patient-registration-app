import React from "react";
import "./PatientTable.scss";

const PatientTable = ({ patients, isLoading }) => {
  if (!patients || patients.length === 0) {
    return <p>No patients found.</p>;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <table className="patient-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Diagnosis</th>
          <th>Admission Date</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(
          ({ id, name, age, gender, diagnosis, admission_date }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{gender}</td>
              <td>{diagnosis}</td>
              <td>{admission_date?.toLocaleDateString()}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default PatientTable;
