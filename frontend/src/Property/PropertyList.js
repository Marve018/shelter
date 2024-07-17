import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchProperties } from "../services/api";
import Search from "./search";
import Filter from "./filter";
// import PropertyDetail from "./PropertyDetail";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const getPropertiesList = async () => {
        const searchParams = {
            search: searchTerm,
            country,
            state,
            city,
            min_price: minPrice,
            max_price: maxPrice
        };
        try {
            const properties = await searchProperties(searchParams);
            setProperties(properties);
        } catch (error) {
            console.error('Failed to get properties:', error);
        }
    };
    getPropertiesList();
  }, [searchTerm, country, state, city, minPrice, maxPrice]);

  return (
    <div>
      <h1>Property Listings</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Filter
        country={country}
        setCountry={setCountry}
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <Link to={`/property/${property.id}`}>
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            </Link>
          </li>
      ))}
      </ul>
    </div>
  );
};

export default PropertyList;
