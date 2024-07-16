import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const property = propertiesData.find((p) => p.id === parseInt(id));
    if (property) {
      setProperty(property);
      setLoading(false);
    } else {
      setError(new Error("Property not found"));
      setLoading(false);
    }
  }, [id]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!property) {
    return <div>No property found</div>;
  }

  return (
    <div className="property-detail">
      <img
        src={`${process.env.PUBLIC_URL}/Images/${property.image}`}
        alt={property.name}
        className="property-detail-image"
      />
      <h1 className="property-detail-name">{property.name}</h1>
      <p className="property-detail-price">${property.price}</p>
      <p className="property-detail-location">{property.location}</p>
      <p className="property-detail-description">{property.description}</p>
    </div>
  );
};

export default PropertyDetail;
