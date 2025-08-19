import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadGallery = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/gallery');
      
      if (response.data.success) {
        setImages(response.data.images);
      } else {
        setError(response.data.error || 'Failed to load images');
      }
    } catch (err) {
      console.error('Gallery loading error:', err);
      setError(err.response?.data?.error || 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="gallery-page">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="display-4 fw-bold mb-2">Photo Gallery</h1>
            <p className="lead text-muted">
              See our pressure washing transformations in action
            </p>
          </div>
          <button 
            className="btn btn-outline-primary"
            onClick={loadGallery}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Loading...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt me-2"></i>
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-container text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading images...</span>
            </div>
            <p className="mt-3 text-muted">Loading images from gallery folder...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="error-container text-center py-5">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Unable to load gallery</h4>
              <p className="mb-3">{error}</p>
              <p className="mb-0">
                Make sure the backend server is running and the gallery folder exists.
              </p>
              <hr />
              <button className="btn btn-primary" onClick={loadGallery}>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty Gallery */}
        {!loading && !error && images.length === 0 && (
          <div className="empty-gallery text-center py-5">
            <div className="mb-4">
              <i className="fas fa-images text-muted" style={{fontSize: '4rem'}}></i>
            </div>
            <h4 className="text-muted mb-3">No images found</h4>
            <p className="text-muted">
              Add some images to the "public/gallery" folder on the server and refresh the page.
            </p>
            <button className="btn btn-outline-primary" onClick={loadGallery}>
              <i className="fas fa-sync-alt me-2"></i>
              Refresh Gallery
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <>
            {/* <div className="mb-4">
              <p className="text-muted">
                <i className="fas fa-images me-2"></i>
                {images.length} image{images.length !== 1 ? 's' : ''} found
              </p>
            </div> */}
            
            <div className="row g-4">
              {images.map((image, index) => (
                <div key={image.filename} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="gallery-item">
                    <div className="card h-100 shadow-sm border-0 gallery-card">
                      <div className="card-img-container position-relative overflow-hidden">
                        <img
                          src={`http://localhost:5000${image.url}`}
                          alt={image.title}
                          className="card-img-top gallery-image"
                          style={{
                            height: '250px',
                            objectFit: 'cover',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease'
                          }}
                          onClick={() => openModal(image)}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                          loading="lazy"
                        />
                        <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                             style={{
                               background: 'rgba(0,0,0,0.7)',
                               opacity: 0,
                               transition: 'opacity 0.3s ease',
                               cursor: 'pointer'
                             }}
                             onClick={() => openModal(image)}
                             onMouseOver={(e) => e.target.style.opacity = 1}
                             onMouseOut={(e) => e.target.style.opacity = 0}
                        >
                          <i className="fas fa-search-plus text-white" style={{fontSize: '2rem'}}></i>
                        </div>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title text-capitalize mb-2">{image.title}</h6>
                        <div className="card-text">
                          <small className="text-muted d-block">
                            <i className="fas fa-calendar-alt me-1"></i>
                            {formatDate(image.lastModified)}
                          </small>
                          <small className="text-muted">
                            <i className="fas fa-file-alt me-1"></i>
                            {formatFileSize(image.size)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Floating Refresh Button */}
        <button
          className="btn btn-primary btn-lg rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center"
          style={{
            bottom: '30px',
            right: '30px',
            width: '60px',
            height: '60px',
            zIndex: 1000
          }}
          onClick={loadGallery}
          title="Refresh Gallery"
          disabled={loading}
        >
          <i className={`fas fa-sync-alt ${loading ? 'fa-spin' : ''}`}></i>
        </button>
      </div>

      {/* Modal for full-size images */}
      {selectedImage && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-capitalize">{selectedImage.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                <img
                  src={`http://localhost:5000${selectedImage.url}`}
                  alt={selectedImage.title}
                  className="img-fluid w-100"
                  style={{maxHeight: '70vh', objectFit: 'contain'}}
                />
              </div>
              <div className="modal-footer justify-content-between">
                <div>
                  <small className="text-muted">
                    <i className="fas fa-calendar-alt me-1"></i>
                    {formatDate(selectedImage.lastModified)}
                    <span className="ms-3">
                      <i className="fas fa-file-alt me-1"></i>
                      {formatFileSize(selectedImage.size)}
                    </span>
                  </small>
                </div>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;