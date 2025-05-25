import React, { useEffect } from "react";
import { PGliteProvider } from "@electric-sql/pglite-react";
import PatientForm from "./Components/PatientForm/PatientForm";
import {
  createTable,
  getPatients,
  insertDummyPatients,
} from "./database/Patient";
import PatientTable from "./Components/PatientTable/PatientTable";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import "./App.scss";
import { Repl } from '@electric-sql/pglite-repl'
import { getDbInstance } from "./database";
import Query from "./Components/Query/Query";


const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [patients, setPatients] = React.useState([]);
  const dbInitRef = React.useRef(false);
  const dbRef= React.useRef(null);
  useEffect(() => {
    async function initDatabase() {
      if (dbInitRef.current) return; // Prevent re-initialization
      dbInitRef.current = true;
      dbRef.current = await getDbInstance();
      await createTable();
      const initialPatients = await getPatients();
      if (initialPatients && initialPatients.length > 0)
        setPatients(initialPatients);
      else {
        await insertDummyPatients(); // optional: remove in production
        const patients = await getPatients();
        setPatients(patients);
      }
      setIsLoading(false);
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
          element={<PatientTable patients={patients} isLoading={isLoading} />}
        />
        <Route
          path="/add"
          element={<PatientForm setPatients={setPatients} />}
        />
        <Route
          path="/query"
          element={
            <Query
              pg={dbRef.current}
              theme="light"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
