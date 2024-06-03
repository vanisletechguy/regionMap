import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; 
import Map from './Map'; 
import Dashboard from './Dashboard'; 
import './App.css'

const App = () => {
    const [regionData, setRegionData] = useState(null);

    const fetchRegionData = async (regionId) => {
        const response = await fetch(`/api/region/${regionId}`);
        const data = await response.json();
        setRegionData(data);
    };

    const handleRegionClick = (regionId) => {
        fetchRegionData(regionId);
    };

    const regions = [
        { id: '1', positions: [[-123.948, 49.156], [-123.948, 49.166], [-123.938, 49.166], [-123.938, 49.156], [-123.948, 49.156]] },
        { id: '2', positions: [[-123.938, 49.156], [-123.938, 49.166], [-123.928, 49.166], [-123.928, 49.156], [-123.938, 49.156]] },
        { id: '3', positions: [[-123.928, 49.156], [-123.928, 49.166], [-123.918, 49.166], [-123.918, 49.156], [-123.928, 49.156]] },
    ];

    return (
        <div style={{ display: 'flex' }}>
            <Dashboard regionData={regionData} />
            <Map regions={regions} onRegionClick={handleRegionClick} />
        </div>
    );
};

export default App;

