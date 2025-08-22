import React, { useState, useEffect } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import './NearbyQuery.css';
import NavBar from './Nav_worker';

const NearbyQuery = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalInstance, setModalInstance] = useState(null);
  const workerEmail = localStorage.getItem("userEmail");

  // Fetch nearby queries from the API
  useEffect(() => {
    const fetchNearbyQueries = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/workers/${workerEmail}/nearby_queries`);
        if (response.ok) {
          console.log('Fetching work queries for:', workerEmail);
          const data = await response.json();
          // Filter out the requests where the status is 'pending'
          const pendingRequests = data.filter(query => query.status === 'Pending');
          setRequests(pendingRequests);
        } else {
          console.error('Failed to fetch work queries:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching nearby queries:', error);
      }
    };

    fetchNearbyQueries();
  }, [workerEmail]);

  const handleCardClick = (request) => {
    setSelectedRequest(request);
    if (!modalInstance) {
      const modal = new Modal(document.getElementById('serviceModal'));
      setModalInstance(modal);
    }
    modalInstance?.show();
  };

  const handleAccept = async (requestId, worker_email) => {
    const isConfirmed = window.confirm("Are you sure you want to accept this work request?");
    
    if (!isConfirmed) return;
  
    try {
      // Send a PATCH request to update status and create response
      const response = await fetch(`http://127.0.0.1:5000/${requestId}/accept`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ worker_email: workerEmail }), // Send worker email in the body
      });
  
      if (response.ok) {
        alert("Work request accepted and response submitted successfully!");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to accept the work request.");
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while accepting the work request.");
    }
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
                  <button 
                    className="btn btn-success"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(request.work_id);
                    }}
                  >
                    Accept
                  </button>
                </div>
                <div className="service-body">
                  <p className="service-description">{request.description}</p>
                  <div className="service-time">{formatTimeSlot(request)}</div>
                  <div className="service-budget">Budget: {request.budget}</div>
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
                    <div className="service-address">Address: {selectedRequest.address}</div>
                    <div className="service-time">{formatTimeSlot(selectedRequest)}</div>
                    <div className="service-budget">Budget: {selectedRequest.budget}</div>

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

export default NearbyQuery;
