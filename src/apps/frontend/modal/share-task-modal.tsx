import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const TaskSharingModal = ({ visible, onCancel, taskId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch all users
        axios.get('/api/users').then(response => {
            setUsers(response.data);
        });
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleShare = () => {
        axios.post('/api/tasks/share', { taskId, userIds: selectedUsers })
            .then(response => {
                // Handle successful sharing
                onCancel();
            })
            .catch(error => {
                console.error("Error sharing task:", error);
            });
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUsers(prevSelected => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter(id => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Modal
            title="Share Task"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>Cancel</Button>,
                <Button key="share" type="primary" onClick={handleShare}>Share</Button>
            ]}
        >
            <Input
                placeholder="Search users"
                prefix={<UserOutlined />}
                value={searchTerm}
                onChange={handleSearch}
            />
            {filteredUsers.map(user => (
                <div key={user.id}>
                    <Checkbox onChange={() => handleCheckboxChange(user.id)}>{user.name}</Checkbox>
                </div>
            ))}
        </Modal>
    );
};

export default TaskSharingModal;
