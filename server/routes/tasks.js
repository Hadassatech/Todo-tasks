// tasks.js
const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = './data/tasks.json';

// Load tasks
const loadTasks = () => {
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath));
    }
    return [];
};

// Save tasks
const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
router.get('/', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

// Add a new task
router.post('/', (req, res) => {
    const tasks = loadTasks();
    const newTask = {
        task_id: tasks.length ? tasks[tasks.length - 1].task_id + 1 : 1,
        title: req.body.title,
        description: req.body.description || '',
        create_date: new Date().toISOString(),
        update_date: new Date().toISOString(),
        due_date: req.body.due_date || null,
        assigned_user_id: req.body.assigned_user_id || null,
        priority_id: req.body.priority_id || 1,
        status_id: req.body.status_id || 1,
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});


// Delete a task
router.delete('/:id', (req, res) => {
    let tasks = loadTasks();
    const taskId = parseInt(req.params.id, 10);
    tasks = tasks.filter((task) => task.task_id !== taskId);
    saveTasks(tasks);
    res.status(204).send();
});

// Update a task
router.put('/:id', (req, res) => {
    let tasks = loadTasks();
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex((task) => task.task_id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = {
        ...tasks[taskIndex],
        ...req.body, 
        update_date: new Date().toISOString(), 
    };

    tasks[taskIndex] = updatedTask;
    saveTasks(tasks); 
    res.json(updatedTask); 
});

module.exports = router;



