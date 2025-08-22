import React from 'react';
import { Carousel } from 'react-bootstrap';
import './HomeCarousel.css';

const WorkerCarousel = () => {
  return (
    <div id='carousel'>
    <Carousel id="homeCarousel" fade className="carousel">
      {/* First carousel item */}
      <Carousel.Item className="carousel-item" style={{ backgroundImage: 'url(/img/bg.png)' }}>
        <div className="container">
          <div className="carousel-content-wrapper">
            <div className="circular-image-container">
              <div className="circular-image">
                <img src="/img/main.png" alt="Home Service Professional" />
              </div>
            </div>
            <div className="carousel-text">
              <h1 className="logo-text">
                H<span><img src="/img/home-agreement.png" alt="" style={{ width: '50px', height: '50px', marginBottom: '10px' }} /></span>ME MEND
              </h1>
              <h2 className="carousel-subtitle">OFFERS THE BEST HOME SERVICES</h2>
              <p className="carousel-description">Your Home, their expertise, find the Right choice!</p>
              <div className="action-buttons">
                   <a href="signin.html" className="btn btn-primary btn-outline-light">VIEW WORKS</a>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>

      {/* Second carousel item */}
      <Carousel.Item className="carousel-item" style={{ backgroundImage: 'url(/img/bg2.gif)' }}>
        <div className="container">
          <div className="carousel-content-wrapper">
            <div className="circular-image-container">
              <div className="circular-image">
                <img src="/img/main.png" alt="Professional Services" />
              </div>
            </div>
            <div className="carousel-text">
              <h1 className="logo-text">
                H<span><img src="/img/home-agreement.png" alt="" style={{ width: '50px', height: '50px', marginBottom: '10px' }} /></span>ME MEND
              </h1>
              <h2 className="carousel-subtitle">OFFERS THE BEST HOME SERVICES</h2>
              <p className="carousel-description">Your Home, their expertise, find the Right choice!</p>
              <div className="action-buttons">
                <a href="signin.html" className="btn btn-primary btn-outline-light">VIEW WORKS</a>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default WorkerCarousel;