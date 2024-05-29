// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails'; // Import the new component
import './App.css'
const App = () => {
    return (
        <Router>
            <div className='container'>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/add-employee" element={<AddEmployee />} />
                    <Route path="/employee-details" element={<EmployeeDetails />} /> {/* Add this line */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
