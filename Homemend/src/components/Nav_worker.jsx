import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav_user.css";

const NavBar = () => {
  // const [activeLink, setActiveLink] = useState('/home');
  const location = useLocation(); // Get the current route
  const [activeLink, setActiveLink] = useState(location.pathname);

  const workerEmail = localStorage.getItem('userEmail');

  // const handleClick = (e, path) => {
  //   e.preventDefault();
  //   setActiveLink(path);
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo and Brand */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#1BAC91"/>
            <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="#1BAC91"/>
          </svg>
          <span className="ms-2">HOME MEND</span>
        </a>

        {/* Hamburger Menu Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
            <Link 
                to="/worker" 
                className={`nav-link ${activeLink === '/worker' ? 'active' : ''}`}
                // onClick={(e) => handleClick(e, '/addedRequests')}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
            <Link 
                to="/nearbyworks" 
                className={`nav-link ${activeLink === '/nearbyworks' ? 'active' : ''}`}
                // onClick={(e) => handleClick(e, '/addedRequests')}
              >
                NEARBY WORKS
              </Link>
            </li>
            <li className="nav-item">
            <Link 
                to="/acceptedworks" 
                className={`nav-link ${activeLink === '/acceptedworks' ? 'active' : ''}`}
                // onClick={(e) => handleClick(e, '/addedRequests')}
              >
                ACCEPTED WORKS
              </Link>
            </li>
          </ul>
          
          {/* User Icon Dropdown */}
          <div className="navbar-user dropdown">
            <button 
              className="btn dropdown-toggle user-icon-btn" 
              type="button" 
              id="userDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#1BAC91" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            
            <div className="dropdown-menu dropdown-menu-end user-dropdown">
              <div className="profile-avatar user-avatar mx-auto">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="user-email">{workerEmail}</div>
              <button className="btn btn-profile">
                <Link to="/workerprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  VIEW PROFILE
                </Link>
              </button>
              <button className="btn btn-signout">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  SIGN OUT
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;



// const fetchUserEmail = async () => {
//     try {
//       const response = await fetch('your-api-endpoint', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${yourAuthToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch user data');
//       }
  
//       const data = await response.json();
//       setUserEmail(data.email);
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error fetching user email:', error);
//       setIsLoading(false);
//     }
//   };


//   const handleLogout = async () => {
//     try {
//       const response = await fetch('your-logout-endpoint', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${yourAuthToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (response.ok) {
//         // Clear local storage/cookies
//         localStorage.removeItem('authToken');
//         // Clear user state
//         setUserEmail('');
//         // Redirect to login page
//         // history.push('/login');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };