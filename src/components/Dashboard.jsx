import React from 'react';
import { useLogout } from '../hooks/useLogout';

const Dashboard = () => {
  const { logout } = useLogout();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;