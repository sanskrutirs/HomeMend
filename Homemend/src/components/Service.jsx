// App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav_user from './Nav_user.jsx';
import ServicesSidebar from './ServicesSidebar';
import RequestForm from './RequestForm'; 

const Service = () => {
  const [selectedService, setSelectedService] = useState('CARPENTERING SERVICE');

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  return (
        <div className='App'>
        <Nav_user/>
        <div className="container">
            <div className="row">
            <div className="col-md-4">
                <ServicesSidebar onServiceSelect={handleServiceSelect} selectedService={selectedService} />
            </div>
            <div className="col-md-8">
                <RequestForm selectedService={selectedService} />
            </div>
            </div>
        </div>
        </div>
  );
};

export default Service;