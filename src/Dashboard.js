import React from 'react';
import './App.css';

const Dashboard = ({ regionData }) => {
  const renderCard = (title, data, voters) => (
    <div className="card">
      <h3>{title}</h3>
      <p>Doors Knocked: {data.doorsKnocked} ({((data.doorsKnocked / voters) * 100).toFixed(2)}%)</p>
      <p>Calls Made: {data.callsMade} ({((data.callsMade / voters) * 100).toFixed(2)}%)</p>
      <p>Friendly Responses: {data.friendlyResponses} ({((data.friendlyResponses / voters) * 100).toFixed(2)}%)</p>
    </div>
  );

  return (
    <div className="dashboard">
      <h2>Canvassing Summary</h2>
      <div className="summary-section">
        <h3>Last Week</h3>
        {regionData ? renderCard('Last Week', regionData.lastWeek, regionData.voters) : <p>No data available</p>}
      </div>
      <div className="summary-section">
        <h3>Last 30 Days</h3>
        {regionData ? renderCard('Last 30 Days', regionData.last30Days, regionData.voters) : <p>No data available</p>}
      </div>
      <div className="summary-section">
        <h3>This Campaign</h3>
        {regionData ? renderCard('This Campaign', regionData.thisCampaign, regionData.voters) : <p>No data available</p>}
      </div>
    </div>
  );
};

export default Dashboard;

