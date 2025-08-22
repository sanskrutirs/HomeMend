import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Profile.css';
import { Link, useLocation } from 'react-router-dom';
const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    password: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: ''
  });
  const [loading, setLoading] = useState(true);

  // Retrieve email from local storage
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (email) {
      // Fetch profile data when component mounts
      fetch(`http://localhost:5000/customers/${email}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            setProfileData({
              name: `${data.first_name} ${data.last_name}`,
              email: data.email,
              mobileNo: data.mobile_number,
              password: '********',
              address: data.address,
              city: data.city,
              state: data.state,
              pinCode: data.pincode
            });
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
          setLoading(false);
        });
    }
  }, [email]);

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

    const [firstName, lastName] = profileData.name.split(' ');

    const updatedProfile = {
      first_name: firstName || '',
      last_name: lastName || '',
      mobile_number: profileData.mobileNo,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      pincode: profileData.pinCode
    };

    fetch(`http://localhost:5000/customers/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProfile)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile updated:', data);
        alert('Profile updated successfully!');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('Failed to update profile!');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section-title">PERSONAL</div>
        
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profileData.name}
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
            name="mobileNo"
            value={profileData.mobileNo}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={profileData.password}
            readOnly
          />
        </div>

        {/* Address Information */}
        <div className="form-section-title mt-4">ADDRESS</div>

        <div className="form-group">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={profileData.address}
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
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={profileData.state}
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

        {/* Save Button */}
        <div className="text-right">
          <Link to='/user'><button type="submit" className="btn btn-save">  SAVE
          </button></Link>
          
        </div>
      </form>
    </div>
  );
};

export default Profile;
