import React from 'react';

const CasePopup = ({ caseData, onClose }) => (
    <div className="popup-overlay">
        <div className="popup">
            <h3>Case Details</h3>
            <p>Location: {caseData.address}</p>
            <p>Severity: {caseData.severity}</p>
            <button onClick={onClose}>Close</button>
        </div>
    </div>
);

export default CasePopup;
