import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div id='contact'>
        <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-3">
            <div className="contact-info">
              <h5 className='home'><span>H</span>OME <span>M</span>END</h5>
              <p>IIT Dharwad</p>
              <p>Karnataka, India</p>
              <p><strong>Phone:</strong> +1 5589 55488 55</p>
              <p><strong>Email:</strong> info@iitdh.ac.in</p>
              <div className="social-links">
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-skype"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-md-3">
            <h5>Useful Links</h5>
            <ul className="footer-links list-unstyled">
              <li><i className="bi bi-chevron-right"></i><a href="#">Home</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">About us</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">Services</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">Our process</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">View Service</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-md-3">
            <h5>Our Services</h5>
            <ul className="footer-links list-unstyled">
              <li><i className="bi bi-chevron-right"></i><a href="#">Carpenter</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">Plumber</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">Painter</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">Technician</a></li>
              <li><i className="bi bi-chevron-right"></i><a href="#">Electrician</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-3">
            <div className="newsletter">
              <h5>Our Newsletter</h5>
              <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
              {/* <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-subscribe" type="button">Subscribe</button>
              </div> */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>
            © Copyright <strong>Home Mend</strong>. All Rights Reserved<br />
            Designed by <a href="#">Sanskruti, Aakash, Prasanna</a>
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;