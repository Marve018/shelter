import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <Link to={`/property/${property.id}`}>
        <img
          src={`${process.env.PUBLIC_URL}/Images/${property.image}`}
          alt={property.name}
          className="property-image"
        />
        <h2 className="property-name">{property.name}</h2>
        <p className="property-price">${property.price}</p>
        <p className="property-location">{property.location}</p>
      </Link>
    </div>
  );
};

export default PropertyCard;
