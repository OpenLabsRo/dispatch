// src/pages/HomePage.js
import React, { useState } from 'react';
import DispatcherMap from '../components/DispatcherMap';
import Sidebar from '../components/Sidebar';
import CasePopup from '../components/CasePopup';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [cases, setCases] = useState([]);
    const [ambulances, setAmbulances] = useState([
        { longitude: 26.1, latitude: 44.43, status: 'available' },
        { longitude: 26.11, latitude: 44.45, status: 'busy' },
        // Add more ambulances as needed
    ]);
    const [selectedCase, setSelectedCase] = useState(null);
    const navigate = useNavigate();

    const handleCaseSelect = (caseData) => setSelectedCase(caseData);

    return (
        <div className="app-container">
            <DispatcherMap ambulanceData={ambulances} selectedCase={selectedCase} />
            <Sidebar
                cases={cases}
                ambulances={ambulances}
                onCaseSelect={handleCaseSelect}
                onNewCase={() => navigate('/new-case')}
                onAmbulanceSelect={(amb) => {}}
            />
            {selectedCase && <CasePopup caseData={selectedCase} onClose={() => setSelectedCase(null)} />}
        </div>
    );
};

export default HomePage;
