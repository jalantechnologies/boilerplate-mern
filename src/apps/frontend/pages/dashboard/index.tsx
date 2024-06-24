import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [sharedTasks, setSharedTasks] = useState([]);

    useEffect(() => {
        // Fetch shared tasks
        axios.get('/api/tasks/shared')
            .then(response => {
                setSharedTasks(response.data);
            })
            .catch(error => {
                console.error("Error fetching shared tasks:", error);
            });
    }, []);

    return (
        <div>
            <h2>Shared Tasks</h2>
            {sharedTasks.map(task => (
                <div key={task.id}>
                    <h3>{task.name}</h3>
                    <p>Shared by: {task.sharedBy}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
