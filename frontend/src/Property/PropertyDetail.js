import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import propertiesData from "../data";
import "./PropertyDetail.css";
import { getPropertyById } from "../services/api";

const PropertyDetail = async () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const property = await getPropertyById(id);
        if (property) {
          setProperty(property);
          setLoading(false);
        } else {
          setError(new Error("Property not found"));
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProperty();
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
    <div>
        <h1>{property.title}</h1>
        <p>{property.description}</p>
        <p>Price: ${property.price}</p>
        <p>Address: {property.address}</p>
        <p>Country: {property.country}</p>
        <p>State: {property.state}</p>
        <p>City: {property.city}</p>
        <div>
            {property.imageUrl.map((image, index) => (
                <img key={index} src={image.url} alt={property.title} />
            ))}
        </div>
    </div>
  );
};

export default PropertyDetail;
