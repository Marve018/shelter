import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import propertiesData from "../data";
import "./PropertyList.css";
import { getProperties } from "../services/api";



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
    <div className="property-list grid-container">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
