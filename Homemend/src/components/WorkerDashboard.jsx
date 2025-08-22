import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WorkerCarousel from './WorkerCarousel';
// import { Navbar } from 'react-bootstrap';
import Nav_worker from './Nav_worker';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';


function WorkerPage() {
  return (
    <div>
        <Nav_worker/>
        <WorkerCarousel/>
        <Footer/>
        <ScrollToTopButton/>
        
    </div>
  );
}
export default WorkerPage;