import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import propertiesData from "../data";
import { getProperties } from "../services/api";
// import PropertyDetail from "./PropertyDetail";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getPropertiesList = async () => {
        try {
            const properties = await getProperties();
            setProperties(properties);
        } catch (error) {
            console.error('Failed to get properties:', error);
        }
    };
 getPropertiesList();
  }, []);
  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
