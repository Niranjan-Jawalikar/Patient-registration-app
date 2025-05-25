import React from "react";
import { Repl } from "@electric-sql/pglite-repl";
import "./Query.scss";

export default function Query({ pg, theme }) {
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
