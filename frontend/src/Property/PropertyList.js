import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import propertiesData from "../data";
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(propertiesData);
  }, []);
  return (
    <div className="property-list grid-container">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
