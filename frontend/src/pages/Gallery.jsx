import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Environment-aware API base URL
  const getApiBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      // Production - use your Vercel backend URL
      return 'https://als-pressure-washing.vercel.app';
    }
    // Development - check if backend is running on different port
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  };

  // Environment-aware image base URL
  const getImageBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      // In production, images are served directly from Vercel's static hosting
      return 'https://als-pressure-washing.vercel.app';
    }
    // Development
    return process.env.REACT_APP_API_URL || 'http://localhost:5000';
  };

  const loadGallery = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await axios.get(`${apiBaseUrl}/api/gallery`);
      
      if (response.data.success) {
        // Update image URLs to use the correct base URL
        const imagesWithCorrectUrls = response.data.images.map(image => ({
          ...image,
          url: process.env.NODE_ENV === 'production' 
            ? image.url // In production, the API returns the correct path (/gallery/filename)
            : image.url // In development, keep the API response as is
        }));
        
        setImages(imagesWithCorrectUrls);
      } else {
        setError(response.data.error || 'Failed to load images');
      }
    } catch (err) {
      console.error('Gallery loading error:', err);
      
      // More specific error handling
      if (err.code === 'NETWORK_ERROR' || err.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check if the backend is running.');
      } else if (err.response?.status === 404) {
        setError('Gallery API endpoint not found. Please check your backend deployment.');
      } else if (err.response?.status === 500) {
        setError('Server error occurred while loading images.');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to connect to server');
      }
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

  // Helper function to get full image URL
  const getFullImageUrl = (imageUrl) => {
    const imageBaseUrl = getImageBaseUrl();
    return `${imageBaseUrl}${imageUrl}`;
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
            <p className="mt-3 text-muted">Loading images from gallery...</p>
          </div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <div className="error-container text-center py-5">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Unable to load gallery</h4>
              <p className="mb-3">{error}</p>
              <p className="mb-0">
                {process.env.NODE_ENV === 'development' 
                  ? 'Make sure the backend server is running on port 5000 and the gallery folder exists.'
                  : 'Please check that the backend is properly deployed and accessible.'
                }
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
              {process.env.NODE_ENV === 'development'
                ? 'Add some images to the "public/gallery" folder on the server and refresh the page.'
                : 'No images have been uploaded to the gallery yet.'
              }
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
            <div className="row g-4">
              {images.map((image, index) => (
                <div key={image.filename} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="gallery-item">
                    <div className="card h-100 shadow-sm border-0 gallery-card">
                      <div className="card-img-container position-relative overflow-hidden">
                        <img
                          src={getFullImageUrl(image.url)}
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
                          onError={(e) => {
                            console.error('Failed to load image:', image.filename);
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                          }}
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
                  src={getFullImageUrl(selectedImage.url)}
                  alt={selectedImage.title}
                  className="img-fluid w-100"
                  style={{maxHeight: '70vh', objectFit: 'contain'}}
                  onError={(e) => {
                    console.error('Failed to load modal image:', selectedImage.filename);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                  }}
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