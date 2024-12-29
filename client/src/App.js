import React from 'react';
import TaskList from './components/TaskList';
import { CssBaseline, ThemeProvider, createTheme, Typography, Box } from '@mui/material';
import './App.css';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4caf50', 
        },
        secondary: {
            main: '#1976d2', 
        },
        background: {
            default: '#ffffff', 
            paper: '#f4f6f8', 
        },
        text: {
            primary: '#333', 
            secondary: '#555', 
        },
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
            color: '#45a049', 
            marginBottom: '20px',
            marginTop: '40px',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
               {/* light title */}
                <Box>
                    <Typography variant="h1">To-Do List</Typography>
                </Box>
                <TaskList />
            </div>
        </ThemeProvider>
    );
}

export default App;

