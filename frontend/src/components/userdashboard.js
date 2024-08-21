import React, { useEffect, useState } from 'react';
import { getUserProfile, getUserBookings } from '../services/api';
import { useAuth } from './authcontext';
import { Link } from "react-router-dom";
import './userdashboard.css';

const UserDashboard = () => {
  const { authState } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!authState.user) return;

    const fetchUserProfile = async () => {
      const userData = await getUserProfile(authState.user.userId);
      setProfile(userData);
    };

    const fetchUserBookings = async () => {
      const bookingsData = await getUserBookings(authState.user.userId);
      setBookings(bookingsData);
    };

    fetchUserProfile();
    fetchUserBookings();
  }, [authState.user]);

  if (!authState.user || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="userdashboard">
      
      <div className='profile-con'>
        
        <p>{profile.firstName} {profile.lastName}</p>
        
      </div>
      <div className='parameters'>
      <p>
        <strong>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
            </svg>
        </strong> {profile.email}</p>

        <p><strong>
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"/>
        </svg>

            </strong> {profile.role}</p>
        </div>
      <div className='book-con'>
        <h2>Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                <p><strong>Property:</strong> {booking.property.title}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Link to="/properties/create" className="btn">
            Create Property
          </Link>
    </div>
  );
};

export default UserDashboard;
