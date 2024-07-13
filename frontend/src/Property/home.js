import React from "react";
import "./home.css";

export default function Home(props) {
  // const imageSrc = require(`../Images/${props.item.image}`).default;
  const imageSrc = (
    <img
      src={`../images/${props.item.image}`}
      alt="Product"
      className="property-image"
    />
  );
  console.log(imageSrc);
  return (
    <>
      <div className="property-container">
        <div className="property-card">
          <img src={imageSrc} alt="Product" className="property-image" />
          <h2 className="property-name">{props.item.name}</h2>
          <p className="property-amount">{props.item.price}</p>
          <p className="property-text">{props.item.description}</p>
          <p>{props.item.location}</p>
        </div>
      </div>
    </>
  );
}
