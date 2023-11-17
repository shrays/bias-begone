import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Example from "./pages/example";
import Settings from "./pages/settings";
import Summary from "./pages/summary";
import LinearCorrelation from "./pages/linear";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/example" element={<Example />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/linear" element={<LinearCorrelation />} />
      </Routes>
    </Router>
  );
}

export default App;
