import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={<Login bgColor="var(--bs-success)" />}
          />
          <Route path="/" element={<MainScreen bgColor="#fff" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
