import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaAngleUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          color: '#fff',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#00ceb1',
          border: 'none',
          borderRadius: '10%',
        }}
      >
        <FaAngleUp color="#fff" size="35px" />
      </Button>
    )
  );
};

export default ScrollToTopButton;
