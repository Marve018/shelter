import React, { useState, useEffect } from "react";
import { fetchProperties } from "../services/api";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        const fetchPropertiesList = async () => {
            try {
                const properties = await fetchProperties();
                setProperties(properties);
            } catch (error) {
                console.error('Failed to fetch properties:', error);
            }
        };
        fetchPropertiesList();
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
