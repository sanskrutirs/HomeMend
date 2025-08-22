import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomeCarousel from './HomeCarousel';
// import { Navbar } from 'react-bootstrap';
import NavBar from './Nav';
import ServiceIcons from './ServiceIcons';
import AboutSection from './AboutSection';
import Footer from './Footer';
import ProcessSection from './ProcessSection';
import ScrollToTopButton from './ScrollToTopButton';


function HomePage() {
  return (
    <div>
        <NavBar/>
        <HomeCarousel/>
        <ServiceIcons/>
        <AboutSection/>
        <ProcessSection/>
        <Footer/>
        <ScrollToTopButton/>
        
    </div>
  );
}
export default HomePage;