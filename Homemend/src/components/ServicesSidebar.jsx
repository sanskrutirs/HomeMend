// ServicesSidebar.jsx
import React from 'react';
import './ServicesSidebar.css';

const ServicesSidebar = ({ onServiceSelect, selectedService }) => {
  const services = [
    'CARPENTERING SERVICE',
    'PAINTER SERVICE',
    'PLUMBER SERVICE',
    'ELECTRICIAN SERVICE',
    'TECHNICIAN SERVICE',
  ];

  const serviceImages = {
    'CARPENTERING SERVICE': 'img/carpenter.png',
    'PAINTER SERVICE': 'img/painting.png',
    'PLUMBER SERVICE': 'img/water-tap.png',
    'ELECTRICIAN SERVICE': 'img/electrician.png',
    'TECHNICIAN SERVICE': 'img/gadgets.png',
  };

  return (
    <div className="services-sidebar" style={{ backgroundColor: '#e4fffa' }}>
      {services.map((service) => (
        <div
          key={service}
          className={`service-item ${service === selectedService ? 'active' : ''}`}
          onClick={() => onServiceSelect(service)}
        >
          {service}
        </div>
      ))}

      <img
        src={serviceImages[selectedService] || 'img/default.png'}
        className="worker-icon"
        alt="Worker Icon"
      />
    </div>
  );
};

export default ServicesSidebar;