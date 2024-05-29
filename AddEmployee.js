// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8888/api/employees', { name, position })
            .then(response => {
                console.log('Employee added:', response.data);
                setName('');
                setPosition('');
            })
            .catch(error => {

                console.error('There was an error adding the employee!', error);
            });
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Position:</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;

