import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const HomeCarousel = () => {
  const slides = [
    {
      bgImage: '/img/bg.png',
      mainImage: '/img/main.png',
      logoIcon: '/img/home-agreement.png'
    },
    {
      bgImage: '/img/bg2.gif',
      mainImage: '/img/main.png',
      logoIcon: '/img/home-agreement.png'
    }
  ];

  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="container">
              <div className="carousel-content-wrapper">
                <div className="circular-image-container">
                  <div className="circular-image">
                    <img 
                      src={slide.mainImage} 
                      alt="Home Service Professional" 
                    />
                  </div>
                </div>
                <div className="carousel-text">
                  <h1 className="logo-text">
                    H
                    <span>
                      <img 
                        src={slide.logoIcon} 
                        alt="" 
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          marginBottom: '10px' 
                        }} 
                      />
                    </span>
                    ME MEND
                  </h1>
                  <h2 className="carousel-subtitle">
                    OFFERS THE BEST HOME SERVICES
                  </h2>
                  <p className="carousel-description">
                    Your Home, their expertise, find the Right choice!
                  </p>
                  <div className="action-buttons">
                    <button className="btn btn-primary">
                      <a 
                        href="signin.html" 
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          outline: 0 
                        }}
                      >
                        LOGIN
                      </a>
                    </button>
                    <button className="btn btn-outline-light">
                      <a 
                        href="signup.html" 
                        style={{ 
                          textDecoration: 'none', 
                          color: 'inherit',
                          outline: 0 
                        }}
                      >
                        CREATE ACCOUNT
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="carousel-control-prev" 
        type="button" 
        data-bs-target="#homeCarousel" 
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button 
        className="carousel-control-next" 
        type="button" 
        data-bs-target="#homeCarousel" 
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default HomeCarousel;