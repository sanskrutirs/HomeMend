import React from 'react';
import './ServiceIcons.css';

const ServiceIcons = () => {
  return (
    <div id='services'>
      <section className="service-icons">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
          <div className="col">
            <a href="#" className="text-decoration-none">
              <div className="card service-card">
                <div className="card-body">
                  <div className="icon">
                    <img src="/img/carpenter.png" alt="Carpenter" style={{ width: '75px', height: '75px' }} />
                  </div>
                  <h5 className="card-title">Carpenter</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="text-decoration-none">
              <div className="card service-card">
                <div className="card-body">
                  <div className="icon">
                    <img src="/img/gadgets.png" alt="Technician" style={{ width: '75px', height: '75px' }} />
                  </div>
                  <h5 className="card-title">Technician</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="text-decoration-none">
              <div className="card service-card">
                <div className="card-body">
                  <div className="icon">
                    <img src="/img/water-tap.png" alt="Plumber" style={{ width: '75px', height: '75px' }} />
                  </div>
                  <h5 className="card-title">Plumber</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="text-decoration-none">
              <div className="card service-card">
                <div className="card-body">
                  <div className="icon">
                    <img src="/img/painting.png" alt="Painter" style={{ width: '75px', height: '75px' }} />
                  </div>
                  <h5 className="card-title">Painter</h5>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="text-decoration-none">
              <div className="card service-card">
                <div className="card-body">
                  <div className="icon">
                    <img src="/img/electrician.png" alt="Electrician" style={{ width: '75px', height: '75px' }} />
                  </div>
                  <h5 className="card-title">Electrician</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ServiceIcons;