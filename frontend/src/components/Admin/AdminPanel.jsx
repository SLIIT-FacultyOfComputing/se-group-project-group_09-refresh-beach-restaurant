import React, { useState } from 'react';
import AdminReservationsList from './AdminReservationsList';
import AdminRatingsList from './AdminRatingsList';

const AdminPanel = () => {
  const [activeView, setActiveView] = useState('reservations');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-1/5 bg-gray-800 min-h-screen text-white p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <button
                  className={`w-full text-left p-2 rounded ${activeView === 'reservations' ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveView('reservations')}
                >
                  Reservations
                </button>
              </li>
              <li className="mb-2">
                <button
                  className={`w-full text-left p-2 rounded ${activeView === 'ratings' ? 'bg-blue-700' : 'hover:bg-gray-700'}`}
                  onClick={() => setActiveView('ratings')}
                >
                  Ratings
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="w-4/5 p-4 bg-white">
          {activeView === 'reservations' && <AdminReservationsList />}
          {activeView === 'ratings' && <AdminRatingsList />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 