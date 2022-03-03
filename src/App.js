import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import MainScreen from "./components/MainScreen";

function App() {
  document.title = "Wish Them | WebApp";
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainScreen bgColor="#fff" />} />
        </Routes>
      </div>
      <footer className="app__footer">
        <p>
          &copy;
          <a target="_blank" href="https://chanakyha-coder.xyz">
            Chanakyha.V
          </a>
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
