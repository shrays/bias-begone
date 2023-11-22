import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import LinearCorrelation from "./pages/linear";
import NonLinearCorrelation from "./pages/nonlinear";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/linear" element={<LinearCorrelation />} />
        <Route path="/nonlinear" element={<NonLinearCorrelation />} />
      </Routes>
    </Router>
  );
}

export default App;
