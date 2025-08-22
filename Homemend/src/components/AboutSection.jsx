import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div id='about'>
    <section className="about-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="text-primary">About Us</h2>
            <h3 className="font-weight-bold mb-4">We Provide Cost Effective Solution For You.</h3>
            <p className="text-muted mb-5">Whether you need a plumber, electrician, technician, painter or carpenter, we connect you with trusted professionals in your area.</p>
            <ul className="about-list">
              <li>You can be a worker</li>
              <li>You can be a worker</li>
              <li>You can be a worker</li>
              <li>You can be a worker</li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="about-images">
              <img src="/img/4.jpg" alt="Main service image" className="about-main-image img-fluid rounded" />
              <div className="d-flex gap-3 mt-3">
                <img src="/img/1.png" alt="Service image 1" className="about-small-image img-fluid rounded" />
                <img src="/img/2.png" alt="Service image 2" className="about-small-image img-fluid rounded" />
                <img src="/img/3.png" alt="Service image 3" className="about-small-image img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default AboutSection;