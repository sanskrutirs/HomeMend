import React, { useState, useEffect } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import './AcceptedQuery.css';
import NavBar from './Nav_worker.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const AcceptedQuery = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalInstance, setModalInstance] = useState(null);

  // Fetch the worker's responses from the API on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const workerEmail = localStorage.getItem("userEmail");
        const response = await fetch(`http://127.0.0.1:5000/${workerEmail}/responses`);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setRequests(data);  // Set the requests state with fetched data
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);  // Empty dependency array to run this effect only once when the component mounts

  const handleCardClick = (request) => {
    setSelectedRequest(request);
    if (!modalInstance) {
      const modal = new Modal(document.getElementById('serviceModal'));
      setModalInstance(modal);
    }
    modalInstance?.show();
  };

  const handleCancel = (requestId) => {
    console.log('Cancelling request:', requestId);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Completed': return 'status-completed';
      default: return '';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rating ? faStarSolid : faStarRegular}
        className="rating-star"
      />
    ));
  };

  const renderFeedback = (request) => {
    if (request.status !== 'Completed') return null;

    if (request.rating && request.feedback) {
      return (
        <div className="feedback-display mt-3">
          <div className="rating mb-2">
            {renderStars(request.rating)}
          </div>
          <p className="feedback-text">{request.feedback}</p>
        </div>
      );
    }

    return null;
  };

  const formatDateTime = (request) => {
    return `Request added on: ${request.created_at}`;
  };

  const formatTimeSlot = (request) => {
    if (request.start_date === request.end_date) {
      return `Date: ${request.start_date}`;
    } else {
      return `Date: ${request.start_date} To ${request.end_date}`;
    }
  };

  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            {requests.map((request) => (
              <div key={request.work_id} className="service-card card" onClick={() => handleCardClick(request)}>
                <div className="service-header">
                  <div>
                    <h5 className="service-title">{request.work}</h5>
                    <small className="text-muted">{formatDateTime(request)}</small>
                  </div>
                  <span className={`service-status ${getStatusClass(request.status)}`}>
                    {request.status}
                  </span>
                </div>
                <div className="service-body">
                  <p className="service-description">{request.description}</p>
                  <div className="service-time">{formatTimeSlot(request)}</div>
                  <div className="service-budget">Budget: {request.budget}</div>
                  {request.status !== 'Completed' && (
                    <button 
                      className="btn btn-cancel"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancel(request.work_id);
                      }}
                    >
                      CANCEL
                    </button>
                  )}
                  
                  {renderFeedback(request)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details Modal */}
        <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="serviceModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="serviceModalLabel">Service Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {selectedRequest && (
                  <div className="service-details-card">
                    <h2 className="service-title">{selectedRequest.work}</h2>
                    <p className="service-description">{selectedRequest.description}</p>
                    <div className="service-time">{formatTimeSlot(selectedRequest)}</div>
                    <div className="service-budget">Budget: {selectedRequest.budget}</div>
                    <div className="service-status">
                      <span className="status-label">Status: </span>
                      <span className={getStatusClass(selectedRequest.status)}>
                        {selectedRequest.status}
                      </span>
                    </div>

                    {selectedRequest && selectedRequest.customer_email && (
                      <div className="provider-card">
                        <div className="provider-avatar">
                          <i className="fas fa-user fa-2x"></i>
                        </div>
                        <div className="provider-info">
                          <div>Name: {selectedRequest.customer_first_name} {selectedRequest.customer_last_name}</div>
                          <div>Address: {selectedRequest.customer_address}</div>
                          <div>Mobile No: {selectedRequest.customer_mobile_number}</div>
                        </div>
                      </div>
                    )}


                    {selectedRequest.status !== 'Completed' && (
                      <button 
                        className="btn btn-cancel"
                        onClick={() => handleCancel(selectedRequest.work_id)}
                      >
                        CANCEL
                      </button>
                    )}

                    {renderFeedback(selectedRequest)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptedQuery;
