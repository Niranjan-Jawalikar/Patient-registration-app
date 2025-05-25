import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { getDbInstance } from "./database/index.js";
import { PGliteProvider } from "@electric-sql/pglite-react";

const db = await getDbInstance();

createRoot(document.getElementById("root")).render(
    <PGliteProvider db={db}>
      <App />
    </PGliteProvider>

);
