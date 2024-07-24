import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookProperty } from '../services/api';

const BookProperty = ({ propertyId, user }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
    console.log('User:', user);
    console.log('PropertyId:', propertyId);
  }, [user, propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You need to be logged in to book a property.');
      return;
    }
    try {
      const bookingData = {
        ...formData,
        propertyId,
        userId: user._id
      };
      const response = await bookProperty(bookingData);
      console.log('Booking response:', response);
      navigate(`/properties/${propertyId}`);
    } catch (err) {
      setError(err.response.data.message || 'Booking failed');
    }
  };

  return (
    <div>
      <h3>Book Property</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        <button type="submit">Book Property</button>
      </form>
    </div>
  );
};

export default BookProperty;
