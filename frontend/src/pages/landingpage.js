import React from "react";
import { Link } from "react-router-dom";
import "../pages/landingpage.css";

const LandingPage = () => {
  const propertyLinks = [
    {
      id: 1,
      name: "3 Bedroom House in Asaba",
      image: "property1.jpeg",
    },
    {
      id: 2,
      name: "Modern Apartment in Lagos",
      image: "property2.jpeg",
    },
    {
      id: 3,
      name: "Luxury Villa in Abuja",
      image: "property3.jpeg",
    },
  ];

  return (
    <div className="landing-page">
      <h1>Welcome to Shelter</h1>
      <Sections>
        <Section>
          <h2>Find Your Dream Home</h2>
          <p>
            Shelter provides a wide range of properties for lease and purchase.
            From apartments to houses, we have something for everyone.
          </p>
          {/* <Link to="/property" className="btn">
            Search Properties
          </Link> */}
        </Section>
        <Section>
          <h2>Featured Properties</h2>
          <div className="featured-properties">
            {propertyLinks.map((property) => (
              <Link
                to={property.path}
                key={property.id}
                className="property-link"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/Images/${property.image}`}
                  alt={property.name}
                  className="property-image"
                />
                <p>{property.name}</p>
              </Link>
            ))}
          </div>
        </Section>
        <Section>
          <h2>Testimonials</h2>
          <div className="testimonials">
            <blockquote>
              <p>
                Shelter made it easy for me to find my dream home. I will
                definitely recommend them to anyone looking for a property.
              </p>
              <cite>John Doe</cite>
            </blockquote>
            <blockquote>
              <p>
                Shelter's customer service is top-notch. They were always
                available to answer any questions I had.
              </p>
              <cite>Jane Doe</cite>
            </blockquote>
            <blockquote>
              <p>
                Shelter's properties are always in good condition. I was
                impressed with the quality of the apartments I viewed.
              </p>
              <cite>Bob Smith</cite>
            </blockquote>
          </div>
        </Section>
      </Sections>
      <Footer>
        <p>&copy; 2024 Shelter. All rights reserved.</p>
      </Footer>
    </div>
  );
};

const Sections = ({ children }) => (
  <section className="sections">{children}</section>
);
const Section = ({ children }) => <div className="section">{children}</div>;
const Footer = ({ children }) => <footer className="footer">{children}</footer>;

export default LandingPage;
