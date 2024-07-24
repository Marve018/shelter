import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";
import BookProperty from '../Forms/BookProperty';
import { useAuth } from '../components/authcontext';

const PropertyCard = ({ property }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { authState } = useAuth(); // Get user from auth context

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
  };

  return (
    <div className="property-card">
      <Link to={`/property/${property.id}`}>
        <img
          src={property.imageUrl[0].url} // Use the Cloudinary URL directly
          alt={property.title}
          className="property-image"
        />
        <h2 className="property-title">{property.title}</h2>
        <p className="property-price">${property.price}</p>
        <p className="property-address">{property.address}</p>
      </Link>
      <button onClick={toggleDescription}>
        {showDescription ? "Hide Description" : "Show Description"}
      </button>
      {showDescription && (
        <div className="property-description">{property.description}</div>
      )}
      <button onClick={toggleBookingForm}>
        {showBookingForm ? "Hide Booking Form" : "Book Property"}
      </button>
      {showBookingForm && <BookProperty propertyId={property.id} user={authState.user} />}
    </div>
  );
};


export default PropertyCard;
