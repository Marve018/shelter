import React, { useEffect, useState } from 'react';
import { getUserProfile, getUserBookings } from '../services/api';
import { useAuth } from './authcontext';
import { Link } from "react-router-dom";

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
    <div>
      <h3>User Dashboard</h3>
      <div className='profile-con'>
        
        <h2>Profile</h2>
        <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>
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
