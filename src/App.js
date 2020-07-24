import React from "react";
import { JsonConverter } from "./components/JsonConverter/JsonConverter";
import { FundsView } from "./components/Funds/FundsView";
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ padding: "1rem" }}>
      <ToastProvider>
        <JsonConverter />
        </ToastProvider>
      </div>

      <div style={{ padding: "1rem" }}>
        <FundsView />
      </div>
    </div>
  );
}

export default App;
