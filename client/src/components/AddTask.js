import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import './AddTask.css';

const AddTask = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priorityId, setPriorityId] = useState(1);
    const [statusId, setStatusId] = useState(1);
    const [assignedUserId, setAssignedUserId] = useState('');

    //submit add a new task
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            title,
            description,
            due_date: dueDate,
            priority_id: parseInt(priorityId, 10),
            status_id: parseInt(statusId, 10),
            assigned_user_id: parseInt(assignedUserId, 10) || null,
        };
        onAddTask(newTask);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriorityId(1);
        setStatusId(1);
        setAssignedUserId('');
    };

    return (
        <Box component="form" className="add-task-form" onSubmit={handleSubmit}>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                margin="normal"
            />
            <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Due Date"
                type="date"
                variant="outlined"
                fullWidth
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                    value={priorityId}
                    onChange={(e) => setPriorityId(e.target.value)}
                    label="Priority"
                >
                    <MenuItem value={1}>Low</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                    <MenuItem value={4}>Urgent</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                    label="Status"
                >
                    <MenuItem value={1}>Draft</MenuItem>
                    <MenuItem value={2}>In Progress</MenuItem>
                    <MenuItem value={3}>On Hold</MenuItem>
                    <MenuItem value={4}>Completed</MenuItem>
                    <MenuItem value={5}>Deleted</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Assigned User ID"
                type="number"
                variant="outlined"
                fullWidth
                value={assignedUserId}
                onChange={(e) => setAssignedUserId(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
                Add Task
            </Button>
        </Box>
    );
};

export default AddTask;
