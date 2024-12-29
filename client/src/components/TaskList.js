import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import AddTask from './AddTask';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL; 

  // load tasks
  useEffect(() => {
    axios.get(`${API_URL}/tasks`) 
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // add a new task
  const handleAddTask = (newTask) => {
    axios.post(`${API_URL}/tasks`, newTask)  
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.error('Error adding task:', error));
  };

  // update task
  const handleEditTask = (updatedTask) => {
    axios.put(`${API_URL}/tasks/${updatedTask.task_id}`, updatedTask)
      .then(response => {
        const updatedTasks = tasks.map(task =>
          task.task_id === updatedTask.task_id ? response.data : task
        );
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  // delete task
  const handleDeleteTask = (taskId) => {
    axios.delete(`${API_URL}/tasks/${taskId}`) 
      .then(() => {
        const updatedTasks = tasks.filter(task => task.task_id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="task-list-container">
      <div className="add-task-container">
        <AddTask onAddTask={handleAddTask} />
      </div>
      <div className="task-list-display">
        {tasks.map(task => (
          <TaskItem
            key={task.task_id}
            task={task}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
