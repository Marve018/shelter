import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookProperty } from '../services/api';
import { useAuth } from '../components/authcontext';

const BookProperty = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        ...formData,
        propertyId: id,
        userId: user.id
      };
      const response = await bookProperty(bookingData);
      navigate(`/properties/${id}`);
    } catch (err) {
      setError(err.response.data.message || 'Booking failed');
    }
  };

  if (!user) {
    return <p>You need to be logged in to book a property.</p>;
  }

  return (
    <div>
      <h1>Book Property</h1>
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
