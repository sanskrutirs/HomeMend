import React from 'react';
import constructionWorker from '/img/4.jpg'; // You'll need to add your image
import './ProcessSection.css';

const ProcessSection = () => {
  const processSteps = [
    {
      id: '01',
      icon: 'bi-clipboard-check',
      title: 'ADD YOUR WORK REQUEST',
      description: 'Submit your project details'
    },
    {
      id: '02',
      icon: 'bi-people',
      title: 'MEET THE EXPERTS',
      description: 'Consult with our specialists'
    },
    {
      id: '03',
      icon: 'bi-lightbulb',
      title: 'GET A BEST SERVICES AT DOOR',
      description: 'Receive quality service delivery'
    }
  ];

  return (
    <div id='process'>
      <section className="position-relative">
      <div className="container-fluid px-0 main">
        <div className="row g-0" >
          {/* Hero Section */}
          <div className="col-lg-6">
            <div className='hero-wrapper p-4'>
              <div className="hero-section position-relative">
                <img 
                  src={constructionWorker} 
                  alt="Construction Worker" 
                  className="img-fluid w-100"
                  style={{ 
                    objectFit: 'cover',
                    
                  }}
                />
                <div className="hero-content position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-5 text-white"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                  <p className="text-success mb-2">HOW OUR WEBSITE WORKS</p>
                  <h2 className="display-4 fw-bold mb-4">We Complete Much More<br />Latest Project</h2>
                  <button className="btn btn-outline-success align-self-start px-4 py-2">
                    ADD QUERY
                  </button>
                </div>
              </div>
              </div>
          </div>

          {/* Process Steps */}
          <div className="col-lg-6">
            <div className="process-section p-5">
              <h3 className="text-success mb-5">OUR PROCESS</h3>
              <div className="row g-4">
                {processSteps.map((step) => (
                  <div key={step.id} className="col-md-4">
                    <div className="process-card text-center p-4">
                      <div className="process-icon mb-3">
                        <span className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px' }}>
                          {step.id}
                        </span>
                      </div>
                      <div className="icon-wrapper mb-3">
                        <i className={`bi ${step.icon} text-success fs-1`}></i>
                      </div>
                      <h5 className="fw-bold mb-3">{step.title}</h5>
                      <p className="text-muted">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ProcessSection;