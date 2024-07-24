import React, { useState, useEffect } from "react";
import { searchProperties } from "../services/api";
import Search from "./search";
import Filter from "./filter";
import PropertyCard from "./PropertyCard";
import UserDashboard from "../components/userdashboard";
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const getPropertiesList = async () => {
      const searchParams = {
        search: searchTerm,
        country,
        state,
        city,
        min_price: minPrice,
        max_price: maxPrice,
      };
      try {
        const properties = await searchProperties(searchParams);
        setProperties(properties);
      } catch (error) {
        console.error("Failed to get properties:", error);
      }
    };
    getPropertiesList();
  }, [searchTerm, country, state, city, minPrice, maxPrice]);

  return (
  <div>
        
    <div className='con-container'>
        <div className="user-dashboard">
        <UserDashboard />
      </div>
      
      
      <div className="search-container">
      {/* <h1>Property Listings</h1> */}
        <div className="search-bar">
        {/* <div className='search-con'> */} 
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} className='search-input'/>
          <button onClick={() => setShowFilter(!showFilter)} className='filter-btn'>
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
          {/* </div> */}
        </div> 
        {showFilter && (
          <Filter
            country={country}
            setCountry={setCountry}resturant
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        )}
      
      <div className="property-list grid-container">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
      </div>
      </div>
    </div>
  );
};

export default PropertyList;
