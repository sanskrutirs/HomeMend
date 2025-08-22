import React, { useState } from 'react';
import './RequestForm.css';

const RequestForm = ({ selectedService }) => {
  const [formData, setFormData] = useState({
    dateFrom: '',
    dateTo: '',
    work: '',
    description: '',
    budget: '',
  });

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      customer_email: localStorage.getItem("userEmail"), // Replace with dynamic customer email
      description: formData.description,
      start_date: formData.dateFrom,
      end_date: formData.dateTo,
      budget: formData.budget,
      work: formData.work,
      category: selectedService // Assuming selectedService maps to the category
    };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/work_queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          dateFrom: '',
          dateTo: '',
          work: '',
          description: '',
          budget: '',
        });
      } else {
        alert(result.message || 'Failed to add work query.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error! Please try again.');
    }
  };
  

  return (
    <form className="request-form" style={{ backgroundColor: '#E4FFFA' }} onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Date:</label>
          <div className="d-flex gap-2">
            <input
              type="date"
              className="form-control"
              placeholder="From"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              className="form-control"
              placeholder="To"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Work:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter work details"
          name="work"
          value={formData.work}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          rows="4"
          placeholder="Enter work description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Budget:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter your budget"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-submit" style={{ backgroundColor: '#26B99A', color: 'white' }}>
          ADD QUERY
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
