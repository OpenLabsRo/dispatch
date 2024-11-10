import React, { useState } from 'react';

const CaseForm = ({ onSubmit, onClose }) => {
    const [address, setAddress] = useState('');
    const [severity, setSeverity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ address, severity });
    };

    return (
        <div className="form-container">
            <h2>New Case</h2>
            <form onSubmit={handleSubmit}>
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter Address"
                />
                <label>Severity:</label>
                <input
                    type="text"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    placeholder="Enter Severity"
                />
                <button type="submit">Submit</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CaseForm;
