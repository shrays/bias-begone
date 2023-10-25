import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Example from './pages/example';
import DisplayBias from './pages/DisplayBias';
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/example' element={<Example />} />
                <Route path='/DisplayBias' element={<DisplayBias />}/>
            </Routes>
        </Router>
    );
}
 
export default App;