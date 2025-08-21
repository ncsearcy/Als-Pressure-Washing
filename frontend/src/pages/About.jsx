import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h1 className="display-4 fw-bold mb-4">About Al's Pressure Washing</h1>
            <p className="lead text-muted">
              Founded in late 2024, we're passionate about transforming properties 
              through professional power washing services in Milwaukee, Wisconsin.
            </p>
          </div>
        </div>

        {/* Business Story */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <div className="about-content">
              <h2 className="h3 fw-bold mb-4">About the Business</h2>
              <p className="mb-4">
                Al's Pressure Washing (APW) was founded in late 2024. Our inspiration 
                for power washing came from many years of ideas and exploring what felt 
                right for us. We started off wanting to do car detailing, which then 
                progressed into the idea of starting a carwash.
              </p>
              <p className="mb-4">
                Eventually, after many nights of long discussions, we decided to start 
                with power washing. Fueled by our joy of the outdoors and passion for a 
                job well done, Al's Pressure Washing was born.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-image">
              <img 
                src="/images/APW-Logo.PNG" 
                alt="Power washing equipment" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="row">
          <div className="col-12">
            <h2 className="display-6 fw-bold text-center mb-5">Meet Our Team</h2>
          </div>
        </div>

        {/* Owner - Allen */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-4">
            <div className="team-member-image text-center">
              <img 
                src="/images/Allen.jpg" 
                alt="Allen - Owner" 
                className="img-fluid rounded-circle shadow"
                style={{width: '250px', height: '250px', objectFit: 'cover'}}
              />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="team-member-content">
              <h3 className="h4 fw-bold mb-3">Allen - Owner & Founder</h3>
              <p className="mb-3">
                I am Allen, the driving force behind Al's Pressure Washing (APW). 
                Originally from a small town, I moved to Milwaukee in 2012, where I 
                built a diverse background in customer service, healthcare, food 
                service, and IT support.
              </p>
              <p className="mb-3">
                However, it was the satisfaction of witnessing the transformative power 
                of cleaning and the joy of working outdoors that truly resonated with me. 
                This passion led to the creation of APW. My outgoing nature and genuine 
                interest in people ensure that every interaction is more than just a 
                service call; it's a connection.
              </p>
              <p className="mb-0">
                When I'm not making Milwaukee homes and businesses shine, you'll find me 
                relaxing with a good show, tinkering with IoT projects, or enjoying a 
                video game. I bring that same dedication and attention to detail to 
                every aspect of my life, including your pressure washing needs.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-5" />

        {/* Co-Founder - Lux */}
        <div className="row align-items-center">
          <div className="col-lg-8">
            <div className="team-member-content">
              <h3 className="h4 fw-bold mb-3">Lux - Co-Founder</h3>
              <p className="mb-3">
                Hi, I'm Lux, co-founder of Al's Pressure Washing. I've lived all over 
                North America—from Canada to Louisiana—but I've proudly called Wisconsin 
                home since 2016. My passion for the outdoors and environmental care 
                started early, thanks to years of hands-on conservation work and Eagle 
                Scout projects.
              </p>
              <p className="mb-3">
                At APW, I bring that same dedication to every job we do. Whether it's a 
                driveway, deck, or siding, I believe in getting things clean the right 
                way—safely, efficiently, and with as little impact on the environment as 
                possible. I've also spent years developing strong communication and 
                teamwork skills, so you can count on clear, respectful service from 
                start to finish.
              </p>
              <p className="mb-3">
                When I'm not on the job, I'm either out hiking the woods or working on 
                cars and bikes, always learning how things work and how to make them 
                better.
              </p>
              <p className="fw-bold text-primary mb-0">
                Clean spaces, happy customers, and a lighter touch on nature—that's what 
                I aim for every day.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="team-member-image text-center">
              <img 
                src="/api/placeholder/300/300" 
                alt="Lux - Co-Founder" 
                className="img-fluid rounded-circle shadow"
                style={{width: '250px', height: '250px', objectFit: 'cover'}}
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="values-section bg-light rounded p-5">
              <h2 className="h3 fw-bold text-center mb-4">Our Values</h2>
              <div className="row g-4">
                <div className="col-md-6 col-lg-3">
                  <div className="value-item text-center">
                    <div className="value-icon mb-3">
                      <i className="fas fa-star text-primary" style={{fontSize: '2.5rem'}}></i>
                    </div>
                    <h4 className="h6 fw-bold">Quality First</h4>
                    <p className="text-muted small">
                      We never compromise on the quality of our work
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="value-item text-center">
                    <div className="value-icon mb-3">
                      <i className="fas fa-leaf text-success" style={{fontSize: '2.5rem'}}></i>
                    </div>
                    <h4 className="h6 fw-bold">Environmental Care</h4>
                    <p className="text-muted small">
                      Eco-friendly methods that protect our environment
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="value-item text-center">
                    <div className="value-icon mb-3">
                      <i className="fas fa-handshake text-warning" style={{fontSize: '2.5rem'}}></i>
                    </div>
                    <h4 className="h6 fw-bold">Personal Service</h4>
                    <p className="text-muted small">
                      Every interaction is a genuine connection
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="value-item text-center">
                    <div className="value-icon mb-3">
                      <i className="fas fa-heart text-danger" style={{fontSize: '2.5rem'}}></i>
                    </div>
                    <h4 className="h6 fw-bold">Community Pride</h4>
                    <p className="text-muted small">
                      Proudly serving our Milwaukee community
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="cta-section">
              <h2 className="h3 fw-bold mb-3">Ready to Work Together?</h2>
              <p className="lead text-muted mb-4">
                Experience the Al's Power Washing difference for yourself.
              </p>
              <a href="/contact" className="btn btn-primary btn-lg">
                Get Your Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;