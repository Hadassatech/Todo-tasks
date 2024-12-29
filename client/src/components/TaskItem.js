import React, { useState } from 'react';
import { Button, Paper, Typography, Box, TextField } from '@mui/material';

const TaskItem = ({ task, onDeleteTask, onEditTask }) => {
    const priorityLabels = ['Low', 'Medium', 'High', 'Urgent'];
    const statusLabels = ['Draft', 'In Progress', 'On Hold', 'Completed', 'Deleted'];

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    //save editing task
    const handleSave = () => {
        onEditTask(editedTask);  
        setIsEditing(false);
    };

    return (
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', backgroundColor: '#ffffff', border: '1px solid #1976d2' }}>
            {!isEditing ? (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                        {task.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                        {task.description}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', marginTop: '10px', color: '#333' }}>
                        <strong>Priority:</strong> {priorityLabels[task.priority_id - 1]}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: '#333' }}>
                        <strong>Status:</strong> {statusLabels[task.status_id - 1]}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: '#333' }}>
                        <strong>Due Date:</strong> {task.due_date || 'N/A'}
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', color: '#333' }}>
                        <strong>Assigned User ID:</strong> {task.assigned_user_id || 'N/A'}
                    </Typography>
                    <Button onClick={() => setIsEditing(true)} variant="contained" color="primary" sx={{ marginTop: '10px', marginRight: '10px' }}>
                        Edit
                    </Button>
                    <Button onClick={() => onDeleteTask(task.task_id)} variant="contained" color="secondary" sx={{ marginTop: '10px' }}>
                        Delete
                    </Button>
                </Box>
            ) : (
                <Box>
                    <TextField
                        label="Title"
                        fullWidth
                        value={editedTask.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        label="Due Date"
                        type="date"
                        fullWidth
                        value={editedTask.due_date?.split('T')[0] || ''}
                        onChange={(e) => setEditedTask({ ...editedTask, due_date: e.target.value })}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Assigned User ID"
                        fullWidth
                        value={editedTask.assigned_user_id}
                        onChange={(e) => setEditedTask({ ...editedTask, assigned_user_id: e.target.value })}
                        margin="normal"
                    />
                    <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginTop: '10px', marginRight: '10px' }}>
                        Save
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="contained" color="secondary" sx={{ marginTop: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default TaskItem;
