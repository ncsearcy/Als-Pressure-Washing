import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h5 className="text-primary mb-3">Al's Pressure Washing</h5>
            <p className="mb-2">Professional pressure washing services in Milwaukee, WI</p>
            <p className="text-muted small mb-0">
              Making Milwaukee homes and businesses shine since 2024
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/services" className="text-light text-decoration-none">Services</a></li>
              <li><a href="/gallery" className="text-light text-decoration-none">Gallery</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-8">
            <p className="text-muted small mb-0">
              Background image by{' '}
              <a 
                href="https://unsplash.com/photos/blue-abstract-artwork-suLgJZ1edT4"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                Pawel Czerwinski
              </a>
              <br />
              Logo created by{' '}
              <a 
                href="https://t.me/BaiFluff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                Bai
              </a>
              <br />
              Background for Navigation Bar and Logo created by{' '}
              <a 
                href="https://t.me/Fin_Noodle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light"
              >
                Fin
              </a>
            </p>
          </div>
          <div className="col-md-4 text-md-end">
            <p className="text-muted small mb-0">
              © {new Date().getFullYear()} Al's Pressure Washing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;