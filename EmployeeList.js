import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../EmployeeList.css'; // Import your CSS file

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8888/api/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employees!', error);
            });
    }, []);

    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:8888/api/employees/${id}`)
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the employee!', error);
            });
    };

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id} className="employee-item">
                        <span className="employee-details">{employee.name} - {employee.position}</span>
                        <button className="delete-button" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
