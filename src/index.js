import React from 'react';
import { createRoot } from 'react-dom/client'; // Importamos createRoot en lugar de ReactDOM
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' }, // Indigo
    success: { main: '#4caf50' }, // Green
    error: { main: '#f44336' },   // Red
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

// Obtenemos el elemento root del DOM
const container = document.getElementById('root');
// Creamos un root con createRoot
const root = createRoot(container);
// Renderizamos la app
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);