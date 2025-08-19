import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });

  const [captcha, setCaptcha] = useState({
    question: '',
    answer: '',
    userAnswer: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Generate math captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let answer;
    let question;
    
    if (operator === '+') {
      answer = num1 + num2;
      question = `${num1} + ${num2} = ?`;
    } else {
      // Ensure no negative results
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      answer = larger - smaller;
      question = `${larger} - ${smaller} = ?`;
    }

    setCaptcha({
      question,
      answer,
      userAnswer: ''
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCaptchaChange = (e) => {
    setCaptcha(prev => ({
      ...prev,
      userAnswer: e.target.value
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Required field validation
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.inquiryType) errors.inquiryType = 'Please select an inquiry type';
    if (!formData.message.trim()) errors.message = 'Message is required';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && !/^[0-9\s\-\(\)\+\.]+$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Captcha validation
    if (parseInt(captcha.userAnswer) !== captcha.answer) {
      errors.captcha = 'Please solve the math problem correctly';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/contact', {
        ...formData,
        captcha: captcha.userAnswer
      });

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          inquiryType: '',
          message: ''
        });
        setCaptcha(prev => ({ ...prev, userAnswer: '' }));
        generateCaptcha();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow border-0">
              <div className="card-header bg-primary text-white text-center py-4">
                <h1 className="h3 mb-2">Contact Al's Pressure Washing</h1>
                <p className="mb-0">Get your free quote today!</p>
              </div>

              <div className="card-body p-4">
                {success && (
                  <div className="alert alert-success border-0 mb-4" role="alert">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle me-2"></i>
                      <div>
                        <strong>Thank you!</strong> Your message has been sent successfully. 
                        We'll get back to you soon.
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger border-0 mb-4" role="alert">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <div>{error}</div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                      {validationErrors.firstName && (
                        <div className="invalid-feedback">{validationErrors.firstName}</div>
                      )}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                      {validationErrors.lastName && (
                        <div className="invalid-feedback">{validationErrors.lastName}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {validationErrors.email && (
                      <div className="invalid-feedback">{validationErrors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${validationErrors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      required
                    />
                    {validationErrors.phone && (
                      <div className="invalid-feedback">{validationErrors.phone}</div>
                    )}
                    <div className="form-text">
                      Format: (123) 456-7890 or 123-456-7890
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="inquiryType" className="form-label">
                      Inquiry Type <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${validationErrors.inquiryType ? 'is-invalid' : ''}`}
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select an inquiry type...</option>
                      <option value="general">General Question</option>
                      <option value="services">Services Inquiry</option>
                      <option value="quote">Request a Quote</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {validationErrors.inquiryType && (
                      <div className="invalid-feedback">{validationErrors.inquiryType}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${validationErrors.message ? 'is-invalid' : ''}`}
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry..."
                      required
                    ></textarea>
                    {validationErrors.message && (
                      <div className="invalid-feedback">{validationErrors.message}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      Security Check <span className="text-danger">*</span>
                    </label>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="p-3 border rounded bg-light text-center">
                          <span className="fw-bold fs-5">{captcha.question}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          className={`form-control ${validationErrors.captcha ? 'is-invalid' : ''}`}
                          value={captcha.userAnswer}
                          onChange={handleCaptchaChange}
                          placeholder="Enter the answer"
                          required
                        />
                        {validationErrors.captcha && (
                          <div className="invalid-feedback">{validationErrors.captcha}</div>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm mt-2"
                      onClick={generateCaptcha}
                    >
                      <i className="fas fa-sync-alt me-1"></i>
                      New Question
                    </button>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="contact-info mt-5 pt-4 border-top">
                  <h4 className="h5 fw-bold mb-3">Other Ways to Reach Us</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-map-marker-alt text-primary me-2"></i>
                        <div>
                          <strong>Service Area</strong><br />
                          <small className="text-muted">Milwaukee, Wisconsin</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-clock text-primary me-2"></i>
                        <div>
                          <strong>Response Time</strong><br />
                          <small className="text-muted">Within 24 hours</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;