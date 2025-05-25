import React from "react";
import "./PatientTable.scss";
import { useLiveIncrementalQuery, useLiveQuery, usePGlite } from "@electric-sql/pglite-react";

const PatientTable = () => {
  
  const patients= useLiveQuery("select * from patients",[])
  
  if(!patients) {
    return <p className="patient-message">Loading patients...</p>;
  }
  
  if (!patients.rows || patients.rows.length === 0) {
    return <p className="patient-message">No patients found.</p>;
  }

  return (
    <>
    <table className="patient-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Diagnosis</th>
          <th>Admission Date</th>
        </tr>
      </thead>
      <tbody>
        {patients.rows.map(({ id, name, age, gender, diagnosis, address }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{age}</td>
            <td>{gender}</td>
            <td>{diagnosis}</td>
            <td>{address}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default PatientTable;
