// src/components/Home.js
import React from 'react';
import '../Home.css'; // Import a CSS file for additional styling

const Home = () => {
    return (
        <div className="home-container">
            <h2>Welcome to the Employer Dashboard</h2>
            <p>
                This dashboard allows you to manage your employees efficiently. You can view the list of all employees, add new employees, and delete existing employees. Use the navigation links above to get started.
            </p>
            <div className="features">
                <h3>Features</h3>
                <ul>
                    <li>View a list of all employees</li>
                    <li>Add new employees with ease</li>
                    <li>Delete employees from the database</li>
                    <li>Real-time updates and responsive design</li>
                </ul>
            </div>
            <div className="about">
                <h3>About This Project</h3>
                <p>
                    This project is built using React for the frontend and Tornado with Python for the backend. The data is stored in a MySQL database. The application demonstrates a simple  (Create, Read, Delete) functionality for managing employee records.
                </p>
            </div>
        </div>
    );
};

export default Home;
