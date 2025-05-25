import React, { useEffect } from "react";
import PatientForm from "./Components/PatientForm/PatientForm";
import {
  createTable,
} from "./database/Patient";
import PatientTable from "./Components/PatientTable/PatientTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.scss";
import { getDbInstance } from "./database";
import Query from "./Components/Query/Query";
import { getPatients } from "./database/Patient";
import { insertDummyPatients } from "./database/Patient";

const App = () => {
  const dbRef = React.useRef(null);
  useEffect(() => {
    async function initDatabase() {
      if (!dbRef.current) {
        dbRef.current = await getDbInstance();
        console.log("Database instance initialized:", dbRef.current);
        await createTable();
      }
      const initialPatients = await getPatients();
      if(!initialPatients || initialPatients.length === 0) 
        await insertDummyPatients(); // optional: remove in production
    }

    initDatabase().catch((error) => {
      console.error("Failed to initialize database:", error);
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<PatientTable/>}
        />
        <Route
          path="/add"
          element={<PatientForm/>}
        />
        <Route
          path="/query"
          element={<Query pg={dbRef.current} theme="light" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
