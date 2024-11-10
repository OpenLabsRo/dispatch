import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate hook
import mapboxgl from 'mapbox-gl'

const NewCaseForm = () => {
  const [selectedAmbulance, setSelectedAmbulance] = useState(null)

  const [birthdate, setBirthdate] = useState('')

  const navigate = useNavigate() // useNavigate hook to navigate between pages

  // Calculate birthdate from CNP
  const calculateBirthdate = (cnp) => {
    if (cnp.length < 7) return
    const year =
      cnp[0] === '1' || cnp[0] === '2'
        ? '19' + cnp.slice(1, 3)
        : '20' + cnp.slice(1, 3)
    const month = cnp.slice(3, 5)
    const day = cnp.slice(5, 7)
    return `${year}-${month}-${day}`
  }

  // Back button handler
  const handleBack = () => {
    navigate('/') // Navigate back to the homepage or a different page
  }

  return (
    <div className='form-page'>
      <h2>New Case</h2>
      <form className='case-form'>
        <label>CNP</label>
        <input
          type='text'
          value={cnp}
          onChange={(e) => setCnp(e.target.value)}
          placeholder='Enter CNP'
        />

        <label>Birthdate</label>
        <input
          type='text'
          value={birthdate}
          readOnly
          placeholder='Calculated from CNP'
        />

        <label>Weight</label>
        <input type='text' placeholder='Weight' />

        <label>Allergies</label>
        <input type='text' placeholder='Allergies' />

        <label>Diseases</label>
        <input type='text' placeholder='Diseases' />

        <label>Medication</label>
        <input type='text' placeholder='Medication' />

        <div className='selected-ambulance'>
          Selected Ambulance:{' '}
          {selectedAmbulance
            ? `Ambulance ${selectedAmbulance.id}`
            : 'None'}
        </div>

        <button
          type='submit'
          className='submit-btn'
          onClick={() => {
            navigate('/case')
          }}
        >
          Submit Case
        </button>
      </form>

      {/* Back Button */}
      <button className='back-btn' onClick={handleBack}>
        Back
      </button>
    </div>
  )
}

export default NewCaseForm
