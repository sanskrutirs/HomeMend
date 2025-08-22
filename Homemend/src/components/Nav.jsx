import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";

const Nav = () => {
  const [activeLink, setActiveLink] = useState('/home'); // Default active link

  const handleClick = (e, path) => {
    e.preventDefault(); // Prevent default navigation
    setActiveLink(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
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
            <ScrollLink 
              to="carousel" 
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeLink === '/home' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, '/home')}
            >
              HOME
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink 
              to="about" 
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeLink === '/about' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, '/about')}
            >
              ABOUT US
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink 
              to="services" 
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeLink === '/services' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, '/services')}
            >
              SERVICES
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink 
              to="process" 
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeLink === '/process' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, '/process')}
            >
              OUR PROCESS
            </ScrollLink>
          </li>
          <li className="nav-item">
            <ScrollLink 
              to="contact" 
              smooth={true} 
              duration={500} 
              className={`nav-link ${activeLink === '/contact' ? 'active' : ''}`}
              onClick={(e) => handleClick(e, '/contact')}
            >
              CONTACT US
            </ScrollLink>
          </li>
        </ul>

          
          {/* Add Query Button */}
          <div className="d-flex">
            <button className="btn btn-success" style={{ backgroundColor: '#1BAC91', border: 'none' }}>
              ADD QUERY!
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

// import React, { useState } from "react";
// import { Link } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Nav.css";

// const Nav = () => {
//   const [activeLink, setActiveLink] = useState('/home'); // Default active link
//   const [isOpen, setIsOpen] = useState(false); // Toggle dropdown state

//   const handleClick = (e, path) => {
//     e.preventDefault();
//     setActiveLink(path);
//   };

//   const toggleNavbar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark">
//       <div className="container">
//         <a className="navbar-brand d-flex align-items-center" href="/">
//           <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm0 28C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#1BAC91"/>
//             <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" fill="#1BAC91"/>
//           </svg>
//           <span className="ms-2">HOME MEND</span>
//         </a>

//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           onClick={toggleNavbar} 
//           aria-controls="navbarNav" 
//           aria-expanded={isOpen} 
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className={`collapse navbar-collapse justify-content-between ${isOpen ? 'show' : ''}`} id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <a 
//                 className={`nav-link ${activeLink === '/home' ? 'active' : ''}`}
//                 href="/home"
//                 onClick={(e) => handleClick(e, '/home')}
//               >
//                 HOME
//               </a>
//             </li>
//             <li className="nav-item">
//               <a 
//                 className={`nav-link ${activeLink === '/about' ? 'active' : ''}`}
//                 href="/about"
//                 onClick={(e) => handleClick(e, '/about')}
//               >
//                 ABOUT US
//               </a>
//             </li>
//             <li className="nav-item">
//               <a 
//                 className={`nav-link ${activeLink === '/services' ? 'active' : ''}`}
//                 href="/services"
//                 onClick={(e) => handleClick(e, '/services')}
//               >
//                 SERVICES
//               </a>
//             </li>
//             <li className="nav-item">
//               <a 
//                 className={`nav-link ${activeLink === '/contact' ? 'active' : ''}`}
//                 href="/contact"
//                 onClick={(e) => handleClick(e, '/contact')}
//               >
//                 CONTACT US
//               </a>
//             </li>
//           </ul>
          
//           <div className="d-flex">
//             <button className="btn btn-success" style={{ backgroundColor: '#1BAC91', border: 'none' }}>
//               ADD QUERY!
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Nav;
