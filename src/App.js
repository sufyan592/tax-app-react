import React from "react";
import TaxForm from "../src/components/tax/TaxForm";
import data from "../src/utils/data.json"; 
const App = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Add Tax</h1>
      <TaxForm items={data} />
    </div>
  );
};

export default App;
