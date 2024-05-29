import React, { useState } from 'react';
import axios from 'axios';

const EmployeeDetails = () => {
    const [username, setUsername] = useState('');
    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           
            const response = await axios.get(`http://localhost:8888/api/employees/${username}`);
            setDetails(response.data);
            setError(null);
        } catch (error) {
            
            setError('Employee not found or network error!');
            setDetails(null);
            setUsername('');
            setInterval(()=>{
              return setDetails(null);
            },2000);
        }
    };

    return (
        <div>
            <h2>Get Employee Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Get Details</button>
            </form>
            {details && (
                <div>
                    <h3>Employee Details</h3>
                    <p>Name: {details.name}</p>
                    <p>Position: {details.position}</p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default EmployeeDetails;
