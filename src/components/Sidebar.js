import React, { useState } from 'react'

const Sidebar = ({
  cases,
  ambulances,
  onCaseSelect,
  onNewCase,
  onAmbulanceSelect,
}) => {
  const [showForm, setShowForm] = useState(false) // State to manage form visibility

  // Handle the "Start New Case" button click
  const handleNewCaseClick = () => {
    setShowForm((prevShowForm) => !prevShowForm) // Toggle form visibility
    onNewCase() // Trigger the onNewCase callback (if needed)
  }

  return (
    <div className='sidebar'>
      {/* Start New Case Button */}
      <button onClick={handleNewCaseClick} className='new-case-btn'>
        Start New Case
      </button>

      {/* Case History */}

      <h3>Case History</h3>
      <ul>
        {cases.map((c, index) => (
          <li key={index} onClick={() => onCaseSelect(c)}>
            Case #{index + 1}
          </li>
        ))}
      </ul>

      {/* Available Ambulances */}
      <h3>Available Ambulances</h3>
      <ul>
        {ambulances.map((amb, index) => {
          // Determine the border color based on status
          const borderColor =
            amb.status === 'available' ? 'green' : 'red'

          return (
            <li
              key={index}
              onClick={() => onAmbulanceSelect(amb)}
              className={`ambulance-item ${amb.status}`}
            >
              {/* Apply the green or red border */}
              <div
                className={`ambulance-status ${borderColor}`}
              ></div>
              <span>
                Ambulance {index + 1} - {amb.status}
              </span>
            </li>
          )
        })}
      </ul>

      {/* Form visibility toggle (based on showForm state) */}
      {showForm && (
        <div className='form-container'>
          {/* Your form content goes here */}
          <h3>New Case Form</h3>
          <p>Form content will appear here</p>
        </div>
      )}
    </div>
  )
}

export default Sidebar
