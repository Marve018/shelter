import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProperty, uploadImage } from '../services/api';
import { useAuth } from '../components/authcontext';
import "./CreateProperty.css";

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    country: '',
    state: '',
    city: '',
    imageUrl: []
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const { authState } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);
        const imageResponse = await uploadImage(imageFormData);
        imageUrl = [{ url: imageResponse.url, public_id: imageResponse.public_id }];
      }
      const response = await createProperty({ ...formData, imageUrl });
      navigate('/properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
    }
  };

  console.log('Auth state:', authState);
  
  if (!authState.user || authState.user.role !== 'admin') {
    return <p>You are not authorized to create properties.</p>;
  }

  return (
    <div className='property-detail'>
      <h1>Create Property</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <br></br><textarea className='txt' name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <br></br><input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <br></br><input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <br></br><input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" id='images' onChange={handleImageChange} required />
        <label for='images' >input image</label>
        <br></br><button type="submit">Create Property</button>
      </form>
    </div>
  );
};

export default CreateProperty;
