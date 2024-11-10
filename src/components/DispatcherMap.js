import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './styles.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVpNHJvIiwiYSI6ImNtMzFvOXhsajB6MWMya3M4Z21pNWloenUifQ.fC9Bg3TNkDl0e-ZPpr3pZQ';

const DispatcherMap = ({ ambulanceData, selectedCase }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [26.1025, 44.4268],
                zoom: 12,
                pitch: 45,  // Reduce tilt to avoid too much distortion
                bearing: -17.6,
                maxPitch: 60, // Limit the maximum pitch (tilt) for better visibility
            });

            map.current.on('load', () => {
                map.current.addLayer({
                    id: '3d-buildings',
                    source: 'composite',
                    'source-layer': 'building',
                    filter: ['==', 'extrude', 'true'],
                    type: 'fill-extrusion',
                    minzoom: 15,
                    paint: {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': ['get', 'height'],
                        'fill-extrusion-base': ['get', 'min_height'],
                        'fill-extrusion-opacity': 0.6,
                    },
                });
            });
        }
    }, []);

    useEffect(() => {
        if (map.current) {
            // Clear old markers
            document.querySelectorAll('.marker').forEach(marker => marker.remove());

            // Create a bounds object to keep track of the map's bounds
            const bounds = new mapboxgl.LngLatBounds();

            ambulanceData.forEach(amb => {
                const el = document.createElement('div');
                el.className = `marker ${amb.status}`;
                el.style.backgroundImage = `url(${amb.status === 'available' ? '/Users/andrei/ambulance-dispatcher/public/available-ambulance-icon.png' : '/busy-ambulance-icon.png'})`;
                el.style.width = '30px';
                el.style.height = '30px';
                el.style.borderRadius = '50%';
                el.style.backgroundSize = 'contain'; // Ensure the icon fits inside the marker

                // Add marker with fixed positioning (always upright)
                new mapboxgl.Marker(el, { rotationAlignment: 'map' })
                    .setLngLat([amb.longitude, amb.latitude])
                    .addTo(map.current);

                // Extend bounds to include the marker
                bounds.extend([amb.longitude, amb.latitude]);
            });

            // If a selected case exists, add its marker and extend bounds
            if (selectedCase) {
                const selectedCaseMarker = new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([selectedCase.longitude, selectedCase.latitude])
                    .addTo(map.current);

                // Extend bounds to include the selected case
                bounds.extend([selectedCase.longitude, selectedCase.latitude]);
            }

            // Adjust the map to fit the bounds of the markers
            map.current.fitBounds(bounds, {
                padding: { top: 50, bottom: 50, left: 50, right: 50 }, // Optional padding
                duration: 1000, // Smooth animation over 1 second
            });
        }
    }, [ambulanceData, selectedCase]);

    return <div ref={mapContainer} className="map-container"></div>;
};

export default DispatcherMap;
