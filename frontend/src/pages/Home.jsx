import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-4 fw-bold mb-4">
                  Professional Power Washing Services
                </h1>
                <p className="lead mb-4">
                  Transform your property with Al's Power Washing. We specialize in 
                  driveways, sidewalks, and patios in Milwaukee, Wisconsin.
                </p>
                <div className="hero-buttons">
                  <Link to="/contact" className="btn btn-light btn-lg me-3 mb-2">
                    Get Free Quote
                  </Link>
                  <Link to="/services" className="btn btn-outline-light btn-lg mb-2">
                    Our Services
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img 
                  src="/images/APW-Logo.PNG" 
                  alt="Power washing in action" 
                  className="img-fluid rounded shadow-lg"
                  style={{ width: '100%', height: '400px', objectFit: 'scale-down' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-3">Our Services</h2>
              <p className="lead text-muted">
                Professional cleaning solutions for your property
              </p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px'}}>
                      <i className="fas fa-road text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                  </div>
                  <h4 className="fw-bold mb-3">Driveways</h4>
                  <p className="text-muted">
                    Remove oil stains, dirt, and grime from your driveway. 
                    Restore your concrete or asphalt to like-new condition.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px'}}>
                      <i className="fas fa-walking text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                  </div>
                  <h4 className="fw-bold mb-3">Sidewalks</h4>
                  <p className="text-muted">
                    Keep your sidewalks clean and safe. Remove moss, algae, 
                    and built-up dirt for improved curb appeal.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '80px', height: '80px'}}>
                      <i className="fas fa-home text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                  </div>
                  <h4 className="fw-bold mb-3">Patios</h4>
                  <p className="text-muted">
                    Bring your outdoor living space back to life. Perfect for 
                    concrete, stone, and brick patio surfaces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery Teaser */}
      <section className="gallery-teaser py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="display-5 fw-bold mb-4">See the Difference</h2>
              <p className="lead mb-4">
                Our professional power washing services deliver remarkable results. 
                Check out our gallery to see real before and after photos from 
                recent projects in Milwaukee.
              </p>
              <Link to="/gallery" className="btn btn-primary btn-lg">
                View Gallery
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <img 
                    src="/images/Before_6.jpeg" 
                    alt="Before cleaning" 
                    className="img-fluid rounded shadow"
                  />
                  <p className="text-center mt-2 text-muted">Before</p>
                </div>
                <div className="col-6">
                  <img 
                    src="/images/After_8.jpeg" 
                    alt="After cleaning" 
                    className="img-fluid rounded shadow"
                  />
                  <p className="text-center mt-2 text-muted">After</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold mb-3">Why Choose Al's Power Washing?</h2>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="fas fa-star text-primary" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold">Quality Work</h5>
                <p className="text-muted">Professional results every time</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="fas fa-leaf text-success" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold">Eco-Friendly</h5>
                <p className="text-muted">Environmentally conscious methods</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="fas fa-clock text-warning" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold">Reliable</h5>
                <p className="text-muted">On-time service you can count on</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="text-center">
                <div className="feature-icon mb-3">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: '60px', height: '60px'}}>
                    <i className="fas fa-heart text-danger" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold">Local</h5>
                <p className="text-muted">Proudly serving Milwaukee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section bg-dark text-white py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3">Ready to Get Started?</h2>
              <p className="lead mb-4">
                Contact us today for a free quote and see how we can transform your property.
              </p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;