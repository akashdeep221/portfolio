import React from 'react';

const Dashboard = () => {
  const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>You are logged in.</p>
      {/* {access ? <small>Access token present.</small> : <small>No access token.</small>} */}
    </div>
  );
};

export default Dashboard;
