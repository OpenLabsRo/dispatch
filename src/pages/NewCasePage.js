import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate hook
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import './NewCaseForm.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5kcmVpNHJvIiwiYSI6ImNtMzFvOXhsajB6MWMya3M4Z21pNWloenUifQ.fC9Bg3TNkDl0e-ZPpr3pZQ'

const NewCaseForm = () => {
  const [address, setAddress] = useState('')
  const [showAmbulancePopup, setShowAmbulancePopup] = useState(false)
  const [selectedAmbulance, setSelectedAmbulance] = useState(null)
  const [ambulances] = useState([
    { id: 1, status: 'available', coordinates: [26.1025, 44.4268] },
    { id: 2, status: 'busy', coordinates: [26.105, 44.428] },
  ])
  const [cnp, setCnp] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const mapContainer = useRef(null) // Use ref for the map container
  const geocoderRef = useRef(null)
  const navigate = useNavigate() // useNavigate hook to navigate between pages

  // Mapbox Geocoder Initialization
  useEffect(() => {
    if (!geocoderRef.current) {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'address',
        placeholder: 'Enter address...',
        mapboxgl: mapboxgl,
        countries: 'ro', // Restrict results to Romania
        bbox: [20.2, 44.0, 30.5, 48.5], // Bounding box to narrow the search to Romania
      })

      geocoderRef.current.addTo('#geocoder')

      geocoderRef.current.on('result', (e) => {
        setAddress(e.result.place_name)
        setShowAmbulancePopup(true) // Show ambulance selection popup once address is selected
      })
    }
  }, [])

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

  useEffect(() => {
    if (cnp.length === 13) {
      const birthdateFromCnp = calculateBirthdate(cnp)
      setBirthdate(birthdateFromCnp)
    }
  }, [cnp])

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      address,
      birthdate,
      selectedAmbulance,
      cnp,
    }
    console.log('Form submitted with data:', formData)
  }

  // Handle ambulance selection
  const handleSelectAmbulance = (ambulance) => {
    setSelectedAmbulance(ambulance)
    setShowAmbulancePopup(false)
  }

  useEffect(() => {
    if (showAmbulancePopup) {
      const map = new mapboxgl.Map({
        container: mapContainer.current, // Attach to ref
        style: 'mapbox://styles/mapbox/streets-v11',
        center: ambulances[0].coordinates,
        zoom: 12,
      })

      ambulances.forEach((ambulance) => {
        new mapboxgl.Marker({
          color: ambulance.status === 'available' ? 'green' : 'red',
        })
          .setLngLat(ambulance.coordinates)
          .addTo(map)
      })
    }
  }, [showAmbulancePopup, ambulances])

  // Back button handler
  const handleBack = () => {
    navigate('/') // Navigate back to the homepage or a different page
  }

  return (
    <div className='form-page'>
      <h2>New Case</h2>
      <form onSubmit={handleSubmit} className='case-form'>
        <div id='geocoder' className='geocoder'></div>

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

        <label>Bloc, Scara, Etaj, Apartament</label>
        <input type='text' placeholder='Bloc' />
        <input type='text' placeholder='Scara' />
        <input type='text' placeholder='Etaj' />
        <input type='text' placeholder='Apartament' />

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

      {/* Ambulance Selection Popup */}
      {showAmbulancePopup && (
        <div className='popup'>
          <div className='popup-content'>
            <button
              className='close-btn'
              onClick={() => setShowAmbulancePopup(false)}
            >
              X
            </button>
            <h3>Select an Ambulance</h3>
            <div className='ambulance-list'>
              {ambulances.map((ambulance) => (
                <div
                  key={ambulance.id}
                  className={`ambulance-item ${ambulance.status}`}
                  onClick={() => handleSelectAmbulance(ambulance)}
                >
                  Ambulance {ambulance.id} - {ambulance.status}
                </div>
              ))}
            </div>
            {/* Display the map for ambulance selection */}
            <div className='popup-map' ref={mapContainer}></div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button className='back-btn' onClick={handleBack}>
        Back
      </button>
    </div>
  )
}

export default NewCaseForm
