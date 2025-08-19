import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-road',
      title: 'Driveways',
      description: 'Professional driveway cleaning to remove oil stains, dirt, and grime. We work with concrete, asphalt, and brick driveways to restore them to like-new condition.',
      features: [
        'Oil stain removal',
        'Concrete restoration',
        'Asphalt cleaning',
        'Brick driveway care',
        'Sealant preparation'
      ],
      image: '/images/During_6.jpeg'
    },
    {
      icon: 'fas fa-walking',
      title: 'Sidewalks',
      description: 'Keep your sidewalks clean, safe, and welcoming. We remove moss, algae, dirt buildup, and other debris to improve both safety and curb appeal.',
      features: [
        'Moss & algae removal',
        'Safety improvements',
        'Dirt buildup cleaning',
        'Enhanced curb appeal',
        'Regular maintenance'
      ],
      image: '/images/IMG_0497.JPG'
    },
    {
      icon: 'fas fa-home',
      title: 'Patios',
      description: 'Transform your outdoor living space with professional patio cleaning. Perfect for concrete, stone, brick, and other patio surface materials.',
      features: [
        'Concrete patio cleaning',
        'Stone restoration',
        'Brick maintenance',
        'Furniture area prep',
        'Entertainment space ready'
      ],
      image: '/images/After_10.jpeg'
    }
  ];

  return (
    <div className="services-page">
      <div className="container py-5">
        {/* Header */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h1 className="display-4 fw-bold mb-4">Our Services</h1>
            <p className="lead text-muted">
              Professional power washing services designed to transform your property. 
              We specialize in outdoor surfaces that need expert care.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row g-5 mb-5">
          {services.map((service, index) => (
            <div key={index} className="col-12">
              <div className={`row align-items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="col-lg-6">
                  <div className="service-content">
                    <div className="service-header mb-4 text-center">
                      <div className="service-icon-large mb-3 text-center">
                        <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                             style={{width: '80px', height: '80px'}}>
                          <i className={`${service.icon} text-white`} style={{fontSize: '2rem'}}></i>
                        </div>
                      </div>
                      <h2 className="h3 fw-bold mb-3 text-center">{service.title}</h2>
                      <p className="lead text-muted mb-4">{service.description}</p>
                    </div>

                    <div className="service-features">
                      <h4 className="h5 fw-bold mb-3">What We Include:</h4>
                      <ul className="list-unstyled">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="mb-2">
                            <i className="fas fa-check-circle text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="service-image">
                    <img 
                      src={service.image}
                      alt={`${service.title} cleaning service`}
                      className="img-fluid rounded shadow-lg"
                      style={{width: '100%', height: '400px', objectFit: 'cover'}}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Note */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="alert alert-info border-0 shadow-sm" role="alert">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <i className="fas fa-info-circle text-info" style={{fontSize: '1.5rem'}}></i>
                </div>
                <div>
                  <h4 className="alert-heading h5 fw-bold">Service Notice</h4>
                  <p className="mb-0">
                    <strong>Please note:</strong> At this time, we do not offer soft washing of homes. 
                    We specialize in hard surface cleaning including driveways, sidewalks, and patios. 
                    If you have questions about our services or potential services not listed, please contact us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="process-section bg-light rounded p-5">
              <h2 className="h3 fw-bold text-center mb-5">Our Process</h2>
              <div className="row g-4">
                <div className="col-md-6 col-lg-3">
                  <div className="process-step text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{width: '60px', height: '60px', fontSize: '1.25rem', fontWeight: 'bold'}}>
                      1
                    </div>
                    <h4 className="h5 fw-bold mb-2">Assessment</h4>
                    <p className="text-muted small">
                      We evaluate your property and discuss your specific needs
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="process-step text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{width: '60px', height: '60px', fontSize: '1.25rem', fontWeight: 'bold'}}>
                      2
                    </div>
                    <h4 className="h5 fw-bold mb-2">Preparation</h4>
                    <p className="text-muted small">
                      We prepare the area and protect surrounding landscaping
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="process-step text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{width: '60px', height: '60px', fontSize: '1.25rem', fontWeight: 'bold'}}>
                      3
                    </div>
                    <h4 className="h5 fw-bold mb-2">Cleaning</h4>
                    <p className="text-muted small">
                      Professional power washing using proper techniques and pressure
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="process-step text-center">
                    <div className="step-number bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                         style={{width: '60px', height: '60px', fontSize: '1.25rem', fontWeight: 'bold'}}>
                      4
                    </div>
                    <h4 className="h5 fw-bold mb-2">Final Check</h4>
                    <p className="text-muted small">
                      We ensure quality results and clean up the work area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Our Services */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="h3 fw-bold text-center mb-4">Why Choose Our Services?</h2>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="feature-card text-center p-4">
                  <i className="fas fa-tools text-primary mb-3" style={{fontSize: '2rem'}}></i>
                  <h4 className="h5 fw-bold mb-2">Professional Equipment</h4>
                  <p className="text-muted small">
                    We use commercial-grade equipment designed for optimal results
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="feature-card text-center p-4">
                  <i className="fas fa-shield-alt text-success mb-3" style={{fontSize: '2rem'}}></i>
                  <h4 className="h5 fw-bold mb-2">Safe Methods</h4>
                  <p className="text-muted small">
                    Proper pressure settings and techniques to protect your surfaces
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="feature-card text-center p-4">
                  <i className="fas fa-leaf text-info mb-3" style={{fontSize: '2rem'}}></i>
                  <h4 className="h5 fw-bold mb-2">Eco-Conscious</h4>
                  <p className="text-muted small">
                    Environmental responsibility in all our cleaning processes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row">
          <div className="col-12">
            <div className="cta-section bg-dark text-white rounded p-5 text-center">
              <h2 className="h3 fw-bold mb-3">Ready to Transform Your Property?</h2>
              <p className="lead mb-4">
                Have questions about our services or need something not listed? We're here to help!
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary btn-lg me-3 mb-2">
                  Get Free Quote
                </Link>
                <Link to="/gallery" className="btn btn-outline-light btn-lg mb-2">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;