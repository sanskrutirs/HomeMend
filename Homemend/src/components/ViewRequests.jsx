import React, { useState, useEffect } from 'react';
import Modal from 'bootstrap/js/dist/modal';
import './ViewRequests.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import Nav_user from './Nav_user';
import { useNavigate } from 'react-router-dom';


const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalInstance, setModalInstance] = useState(null);
  const [tempRating, setTempRating] = useState(0);
  const [tempFeedback, setTempFeedback] = useState('');

  useEffect(() => {
    const customerEmail = localStorage.getItem('userEmail');
    console.log("Retrieved email from localStorage:", customerEmail);

    if (customerEmail) {
      console.log('Fetching work queries for:', customerEmail);
      fetch(`http://127.0.0.1:5000/customers/${customerEmail}/work_queries`)
        .then(response => response.json())
        .then(data => {
          console.log("Received work queries:", data);
          setRequests(data);
        })
        .catch(error => {
          console.error('Error fetching work queries:', error);
        });
    }
  }, []);

  const handleCardClick = (request) => {
    setSelectedRequest(request);
    if (!modalInstance) {
      const modal = new Modal(document.getElementById('serviceModal'));
      setModalInstance(modal);
    }
    modalInstance?.show();
  };

  const handleCancel = (requestId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this work query?');
  
    if (confirmed) {
      fetch(`http://127.0.0.1:5000/work_queries/${requestId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setRequests(requests.filter(request => request.id !== requestId));
            alert('Work query has been canceled successfully!');
            window.location.reload();
          } else {
            return response.json().then(data => {
              alert(data.message || 'Failed to cancel work query. Please try again.');
            });
          }
        })
        .catch(error => {
          console.error('Error canceling work query:', error);
          alert('An error occurred while canceling the work query. Please try again.');
        });
    }
  };

//   const handlePayment = (requestId, e) => {
//     e.stopPropagation();
    
//     // Call the payment API
//     fetch(`http://127.0.0.1:5000/work_queries/${requestId}/pay`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.status === 'Paid') {
//             // Update the local state
//             setRequests(requests.map(req => 
//                 req.work_id === requestId ? { ...req, status: 'Paid' } : req
//             ));
//             alert('Payment status updated successfully!');
//         } else {
//             alert(data.message || 'Failed to update payment status.');
//         }
//     })
//     .catch(error => {
//         console.error('Error updating payment status:', error);
//         alert('An error occurred while updating payment status. Please try again.');
//     });
// };
const navigate = useNavigate();


const handlePayment = (requestId, e) => {
  e.stopPropagation();
  const selectedRequest = requests.find(req => req.work_id === requestId);
  navigate('/stripe', { state: { work_id: selectedRequest.work_id, budget: selectedRequest.budget } });
  
};
  
  const handleWorkCompletion = (requestId, isCompleted, e) => {
    e.stopPropagation();
    
    if (isCompleted) {
        // Call the completion API
        fetch(`http://127.0.0.1:5000/work_queries/${requestId}/complete`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'Completed') {
                // Update the local state
                setRequests(requests.map(req =>
                    req.work_id === requestId ? { ...req, status: 'Completed' } : req
                ));
                alert('Work marked as completed successfully!');
            } else {
                alert(data.message || 'Failed to update completion status.');
            }
        })
        .catch(error => {
            console.error('Error updating completion status:', error);
            alert('An error occurred while updating completion status. Please try again.');
        });
    }
};

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Accepted': return 'status-accepted';
      case 'Completed': return 'status-completed';
      case 'Paid': return 'status-paid';
      default: return '';
    }
  };

  const toggleFeedbackForm = (requestId, e) => {
    e.stopPropagation();
    setRequests(requests.map(req => ({
      ...req,
      showFeedbackForm: req.work_id === requestId ? !req.showFeedbackForm : false
    })));
    setTempRating(0);
    setTempFeedback('');
  };

  const handleStarClick = (rating) => {
    setTempRating(rating);
  };

  const handleFeedbackSubmit = async (requestId, responseId, e) => {
    e.preventDefault();
    console.log("Work ID:", requestId, "Response ID:", responseId);
    e.stopPropagation();
  
    // Prepare the feedback data
    const feedbackData = {
      work_id: requestId,
      response_id: responseId,
      feedback: tempFeedback,
    };
  
    const ratingData = {
      work_id: requestId,
      response_id: responseId,
      rating: tempRating,
    };
  
    try {
      // Send the feedback to the backend
      const feedbackResponse = await fetch('http://127.0.0.1:5000/responses/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
  
      const feedbackResult = await feedbackResponse.json();
  
      if (feedbackResponse.ok) {
        alert(feedbackResult.message);
      } else {
        alert(feedbackResult.message || 'Failed to submit feedback.');
        return;
      }
  
      // Send the rating to the backend
      const ratingResponse = await fetch('http://127.0.0.1:5000/responses/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });
  
      const ratingResult = await ratingResponse.json();
  
      if (ratingResponse.ok) {
        alert(ratingResult.message);
  
        // Update the local state with the new feedback and rating
        setRequests(requests.map(req => {
          if (req.id === requestId) {
            return {
              ...req,
              rating: tempRating,
              feedback: tempFeedback,
              showFeedbackForm: false,
            };
          }
          return req;
        }));
  
        // Reset the feedback form
        setTempRating(0);
        setTempFeedback('');
      } else {
        alert(ratingResult.message || 'Failed to submit rating.');
      }
    } catch (error) {
      console.error('Error submitting feedback and rating:', error);
      alert('An error occurred while submitting the feedback and rating. Please try again.');
    }
  };

  const renderStars = (rating, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={(interactive ? index < tempRating : index < rating) ? faStarSolid : faStarRegular}
        className={`rating-star ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => handleStarClick(index + 1) : undefined}
        style={interactive ? { cursor: 'pointer' } : {}}
      />
    ));
  };

  const renderFeedback = (request) => {
    // Show feedback section only for completed requests
    // console.log(request)
    if (request.status !== 'Completed') return null;
  
    // If feedback and rating exist, display them
    if (request.response.rating && request.response.feedback) {
      return (
        <div className="feedback-display mt-3">
          <div className="rating mb-2">
            {renderStars(request.response.rating)} {/* Display existing rating */}
          </div>
          <p className="feedback-text">{request.response.feedback}</p> {/* Display existing feedback */}
        </div>
      );
    }

    return (
      <>
        <button 
          className="btn btn-feed mt-2"
          onClick={(e) => toggleFeedbackForm(request.work_id, e)}
        >
          {request.showFeedbackForm ? 'Cancel Feedback' : 'Give Feedback'}
        </button>

        {request.showFeedbackForm && (
          <form 
            className="feedback-form mt-3"
            onSubmit={(e) => handleFeedbackSubmit(request.work_id, request.response.response_id, e)}
          >
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <div className="star-rating">
                {renderStars(tempRating, true)}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Feedback</label>
              <textarea
                className="form-control"
                value={tempFeedback}
                onChange={(e) => setTempFeedback(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit Feedback
            </button>
          </form>
        )}
      </>
    );
  };

  const formatDateTime = (request) => {
    return `${request.created_at}`;
  };

  const formatTimeSlot = (request) => {
    if (request.start_date === request.end_date) {
      return `${request.start_date}`;
    } else {
      return `${request.start_date}, To ${request.end_date},`;
    }
  };

  return (
    <>
      <Nav_user/>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-lg-8 mx-auto">
            {requests.length === 0 ? (
              <p>No work queries found.</p>
            ) : (
              requests.map((request) => (
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
                    {request.status !== 'Completed' && request.status !== 'Paid' && (
                      <div>
                        <button 
                          className="btn btn-cancel"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel(request.work_id);
                          }}
                        >
                          CANCEL
                        </button>
                        
                        {request.status === 'Accepted' && (
                          <button 
                            className="btn btn-cancel ms-2"
                            onClick={(e) => handlePayment(request.work_id, e)}
                          >
                            PAY NOW
                          </button>
                        )}
                      </div>
                    )}
                    
                    {request.status === 'Paid' && (
                      <div className="work-completion-check mt-3">
                        <p>Is this work completed?</p>
                        <button 
                          className="btn btn-success me-2"
                          onClick={(e) => handleWorkCompletion(request.work_id, true, e)}
                        >
                          Yes
                        </button>
                        <button 
                          className="btn btn-secondary"
                          onClick={(e) => handleWorkCompletion(request.work_id, false, e)}
                        >
                          No
                        </button>
                      </div>
                    )}
                    
                    {renderFeedback(request)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

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

                    {selectedRequest && selectedRequest.worker && (
                      <div className="provider-card">
                        <div className="provider-avatar">
                          <i className="fas fa-user fa-2x"></i>
                        </div>
                        <div className="provider-info">
                          <div>Name: {selectedRequest.worker.first_name} {selectedRequest.worker.last_name}</div>
                          <div>Email: {selectedRequest.worker.email}</div>
                          <div>Mobile No: {selectedRequest.worker.mobile_number}</div>
                        </div>
                      </div>
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

export default ViewRequests;