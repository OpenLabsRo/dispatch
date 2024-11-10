// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewCaseForm from './NewCaseForm'; // Import directly from src directory
import './components/styles.css';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/new-case" element={<NewCaseForm />} />
        </Routes>
    </Router>
);

export default App;
