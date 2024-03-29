import { useState } from "react";

import "./App.scss";
import SaveSegementModal from "./components/SaveSegmentModal";
import SchemaContextProvider from "./context/SchemaContext";

function App() {
  const [showSaveSegment, setShowSaveSegment] = useState(false);
  const onShowSegment = () => {
    setShowSaveSegment((prev) => !prev);
  };
  return (
    <SchemaContextProvider>
      <div className="header">View Audience</div>
      <button className="show_segment" onClick={onShowSegment}>
        Save Segement
      </button>

      {showSaveSegment && <SaveSegementModal onClose={onShowSegment} />}
    </SchemaContextProvider>
  );
}

export default App;
