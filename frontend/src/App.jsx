import React from "react";

import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen bg-black">
        <TaskList />
      </div>
    </>
  );
}

export default App;
