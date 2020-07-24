import React from "react";
import { JsonConverter } from "./components/JsonConverter/JsonConverter";
import { FundsView } from "./components/Funds/FundsView";

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ padding: "1rem" }}>
        <JsonConverter />
      </div>

      <div style={{ padding: "1rem" }}>
        <FundsView />
      </div>
    </div>
  );
}

export default App;
