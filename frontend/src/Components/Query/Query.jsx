import React from "react";
import { Repl } from "@electric-sql/pglite-repl";
import "./Query.scss";
import { usePGlite } from "@electric-sql/pglite-react";

export default function Query({ theme }) {
  const pg = usePGlite();
  if (!pg) {
    return (
      <div className="query-container">
        {" "}
        <p className="query-message">Loading database...</p>
      </div>
    );
  }
  return (
    <>
      <div className="query-container">
        <h1>Query Interface</h1>
        <p>Use the editor to interact with the database.</p>
      </div>
      <div className="query-editor">
        <Repl pg={pg} theme={theme} border={true} />
      </div>
    </>
  );
}
