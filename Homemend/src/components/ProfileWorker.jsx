import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Profile.css';
import { Link, useLocation } from 'react-router-dom';

const ProfileWorker = () => {
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    profession: '',
    city: '',
    pinCode: '',
    state: ''
  });

  const [loading, setLoading] = useState(true);

  // Fetch worker profile data on component mount
  useEffect(() => {
    const email = localStorage.getItem('userEmail');// Replace this with the actual logged-in worker's email
    fetch(`http://127.0.0.1:5000/workers/${email}`)
      .then(response => response.json())
      .then(data => {
        if (data.email) {
          setProfileData({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            mobile_number: data.mobile_number,
            profession: data.profession,
            city: data.city,
            pinCode: data.pincode,
            state: data.state
          });
        } else {
          alert('Worker not found!');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        setLoading(false);
      });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission to update profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = profileData.email; // Worker email to update their profile

    fetch(`http://127.0.0.1:5000/workers/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        mobile_number: profileData.mobile_number,
        profession: profileData.profession,
        city: profileData.city,
        state: profileData.state,
        pincode: profileData.pinCode
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message); // Display success message
        } else {
          alert('Failed to update profile!');
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile!');
      });
  };

  // Loading state for showing spinner while fetching data
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section-title">PERSONAL</div>

        <div className="form-group">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={profileData.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={profileData.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={profileData.email}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mobile No:</label>
          <input
            type="tel"
            className="form-control"
            name="mobile_number"
            value={profileData.mobile_number}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Profession:</label>
          <input
            type="text"
            className="form-control"
            name="profession"
            value={profileData.profession}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={profileData.city}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Pin Code:</label>
          <input
            type="text"
            className="form-control"
            name="pinCode"
            value={profileData.pinCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={profileData.state}
            onChange={handleInputChange}
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
        <Link to='/worker'><button type="submit" className="btn btn-save">  SAVE
        </button></Link>
        </div>
      </form>
    </div>
  );
};

export default ProfileWorker;
