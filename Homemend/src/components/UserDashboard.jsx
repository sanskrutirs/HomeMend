import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserCarousel from './UserCarousel';
// import { Navbar } from 'react-bootstrap';
import Nav_user from './Nav_user';
import ServiceIcons from './ServiceIcons';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';


function UserPage() {
  return (
    <div>
        <Nav_user/>
        <UserCarousel/>
        <ServiceIcons/>
        <Footer/>
        <ScrollToTopButton/>
        
    </div>
  );
}
export default UserPage;