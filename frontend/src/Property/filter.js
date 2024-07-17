import React from "react";

const Filter = ({ country, setCountry, state, setState, city, setCity, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
    return (
        <div>
            <div>
                <label>Country: </label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>

            <div>
                <label>State: </label>
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>

            <div>
                <label>City: </label>
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div>
                <label>Minimum Price: </label>
                <input
                    type="number"
                    placeholder="Minimum Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>

            <div>
                <label>Maximum Price: </label>
                <input
                    type="number"
                    placeholder="Maximum Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Filter;
