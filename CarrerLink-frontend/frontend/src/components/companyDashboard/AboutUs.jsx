import React from "react";

const AboutUs = ({ about, technologies, products, clients }) => {
  return (
    <div className="about-us-section">
      <h3 className="section-title">About Us</h3>
      <div className="about-us-content">
        <p className="description">{about}</p>
        <div className="subtopics">
          <div className="subtopic">
            <h3>Technologies</h3>
            <ul>
              {technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="subtopic">
            <h3>Products</h3>
            <ul>
              {products.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
          </div>
          <div className="subtopic">
            <h3>Clients</h3>
            <ul>
              {clients.map((client, index) => (
                <li key={index}>{client}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
