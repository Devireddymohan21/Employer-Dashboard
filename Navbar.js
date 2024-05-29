// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/employees">Employees</Link></li>
                <li><Link to="/add-employee">Add Employee</Link></li>
                <li><Link to="/employee-details">Employee Details</Link></li> {/* Add this line */}

            </ul>
        </nav>
    );
};

export default Navbar;
