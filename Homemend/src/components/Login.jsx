// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./Login.css";

// const Login = () => {
//   const [signIn, setSignIn] = useState(true);
//   const [userType, setUserType] = useState('user');

//   const handleSignInSubmit = (e) => {
//     e.preventDefault();
//     // Add your sign in logic here
//   };

//   const handleSignUpSubmit = (e) => {
//     e.preventDefault();
//     // Add your sign up logic here
//   };

//   return (
//     <div className="login-container">
//       <div className={`form-container ${signIn ? '' : 'slide'}`}>
//         {/* Sign Up Form */}
//         <div className={`signup-form ${signIn ? '' : 'show'}`}>
//           <div className="card border-0">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-3">Create Account</h2>
//               <form onSubmit={handleSignUpSubmit}>
//                 <div className="mb-3 text-center">
//                   <div className="btn-group" role="group">
//                     <input 
//                       type="radio" 
//                       className="btn-check" 
//                       name="userTypeSignup" 
//                       id="userSignup" 
//                       checked={userType === 'user'}
//                       onChange={() => setUserType('user')}
//                       required
//                     />
//                     <label className="btn btn-outline-primary" htmlFor="userSignup">User</label>

//                     <input 
//                       type="radio" 
//                       className="btn-check" 
//                       name="userTypeSignup" 
//                       id="workerSignup"
//                       checked={userType === 'worker'}
//                       onChange={() => setUserType('worker')}
//                       required
//                     />
//                     <label className="btn btn-outline-primary" htmlFor="workerSignup">Worker</label>
//                   </div>
//                 </div>

//                 <div className="row g-2">
//                   <div className="col-md-6">
//                     <input type="text" className="form-control" placeholder="First Name"   />
//                   </div>
//                   <div className="col-md-6">
//                     <input type="text" className="form-control" placeholder="Last Name" required />
//                   </div>
//                   <div className="col-12">
//                     <input type="email" className="form-control" placeholder="Email" required />
//                   </div>
//                   <div className="col-md-6">
//                     <input type="tel" className="form-control" placeholder="Mobile No" required />
//                   </div>
//                   <div className="col-md-6">
//                     <input 
//                       type="password" 
//                       className="form-control" 
//                       placeholder="Password" 
//                       required
//                       minLength="6"
//                     />
//                   </div>
//                   <div className="col-12">
//                     <input 
//                       type="text" 
//                       className="form-control" 
//                       placeholder={userType === 'user' ? 'Address' : 'Profession'} 
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <input type="text" className="form-control" placeholder="City" required />
//                   </div>
//                   <div className="col-md-6">
//                     <input 
//                       type="text" 
//                       className="form-control" 
//                       placeholder="Pin Code" 
//                       required
//                       pattern="[0-9]{6}"
//                       title="Please enter a valid 6-digit pin code"
//                     />
//                   </div>
//                   <div className="col-12">
//                     <input type="text" className="form-control" placeholder="State" required />
//                   </div>
//                 </div>
//                 <div className="text-center mt-3">
//                   <button type="submit" className="btn btn-primary rounded-pill">Sign Up</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Sign In Form */}
//         <div className={`signin-form ${signIn ? 'show' : ''}`}>
//           <div className="card border-0">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-3">Sign In</h2>
//               <form onSubmit={handleSignInSubmit}>
//                 <div className="mb-3 text-center">
//                   <div className="btn-group" role="group">
//                     <input 
//                       type="radio" 
//                       className="btn-check" 
//                       name="userTypeSignin" 
//                       id="userSignin" 
//                       checked={userType === 'user'}
//                       onChange={() => setUserType('user')}
//                       required
//                     />
//                     <label className="btn btn-outline-primary" htmlFor="userSignin">User</label>

//                     <input 
//                       type="radio" 
//                       className="btn-check" 
//                       name="userTypeSignin" 
//                       id="workerSignin"
//                       checked={userType === 'worker'}
//                       onChange={() => setUserType('worker')}
//                       required
//                     />
//                     <label className="btn btn-outline-primary" htmlFor="workerSignin">Worker</label>
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <input type="email" className="form-control" placeholder="Email" required />
//                 </div>
//                 <div className="mb-3">
//                   <input 
//                     type="password" 
//                     className="form-control" 
//                     placeholder="Password" 
//                     required
//                     minLength="6"
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary rounded-pill">Sign In</button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Overlay Container */}
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-left">
//               <h2>Welcome Back!</h2>
//               <p>To keep connected with us please login with your personal info</p>
//               <button className="btn btn-outline-light rounded-pill" onClick={() => setSignIn(true)}>Sign In</button>
//             </div>
//             <div className="overlay-right">
//               <h2>Hello, Friend!</h2>
//               <p>Enter your personal details and start your journey with us</p>
//               <button className="btn btn-outline-light rounded-pill" onClick={() => setSignIn(false)}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [signIn, setSignIn] = useState(true);
  const [userType, setUserType] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [profession, setProfession] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const clearForm = () => {
    setEmail('');
    setPassword('');
    //setUserType('user'); // Reset to default user type
  
    // Clear additional registration fields
    setFirstName('');
    setLastName('');
    setMobile('');
    setCity('');
    setState('');
    setPincode('');
    setAddress(''); // Clear address if user is registering as user
    setProfession(''); // Clear profession if worker is registering
  };
  
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = userType === 'user' 
      ? 'http://localhost:5000/customers/login' 
      : 'http://localhost:5000/workers/login';
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert(data.message);
        setIsLoggedIn(true);
        localStorage.setItem('userEmail', email);
        clearForm();
      } else {
        alert(data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error! Please try again.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = userType === 'user' 
      ? 'http://localhost:5000/customers' 
      : 'http://localhost:5000/workers';

    const formData = new FormData(e.target);
    const signupData = {
      email: formData.get('email'),
      first_name: formData.get('firstName'),
      last_name: formData.get('lastName'),
      password: formData.get('password'),
      mobile_number: formData.get('mobile'),
      city: formData.get('city'),
      state: formData.get('state'),
      pincode: formData.get('pincode'),
      ...(userType === 'user' 
        ? { address: formData.get('address') } 
        : { profession: formData.get('profession') })
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert(data.message);
        clearForm();
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error! Please try again.');
    }
  };

  const renderContent = () => {

    const navigate = useNavigate();

    if (isLoggedIn) {
      if (userType === 'user') {
        navigate('/user');  // Redirect to /user
      } else {
        navigate('/worker');  // Redirect to /worker
      }
    }

    return (
      // <div className="login-container">
      //   <div className={`form-container ${signIn ? '' : 'slide'}`}>
          
      //     {/* Sign Up Form */}
      //     <div className={`signup-form ${signIn ? '' : 'show'}`}>
      <div className={styles.loginContainer}>
        <div className={`${styles.formContainer} ${signIn ? '' : styles.slide}`}>
          <div className={`${styles.signupForm} ${signIn ? '' : styles.show}`}>
            <div className="card border-0">
              <div className="card-body">
                <h2 className="card-title text-center mb-3">Create Account</h2>
                <form onSubmit={handleSignUpSubmit}>
                  <div className="mb-3 text-center">
                    <div className="btn-group" role="group">
                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="userTypeSignup" 
                        id="userSignup" 
                        checked={userType === 'user'}
                        onChange={() => setUserType('user')}
                        required
                      />
                      <label className="btn btn-outline-primary" htmlFor="userSignup">User</label>
  
                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="userTypeSignup" 
                        id="workerSignup"
                        checked={userType === 'worker'}
                        onChange={() => setUserType('worker')}
                        required
                      />
                      <label className="btn btn-outline-primary" htmlFor="workerSignup">Worker</label>
                    </div>
                  </div>
  
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input type="text" name="firstName" className="form-control" placeholder="First Name" required value={firstName}
                       onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <input type="text" name="lastName" className="form-control" placeholder="Last Name" required value={lastName}
                       onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="col-12">
                      <input type="email" name="email" className="form-control" placeholder="Email" required value={email} 
                       onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <input type="tel" name="mobile" className="form-control" placeholder="Mobile No" required value={mobile} 
                      onChange={(e) => setMobile(e.target.value)}/>
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        minLength="6"
                      />
                    </div>
                    {userType === 'user' ? (
                        <div className="col-12">
                        <input type="text" name="address" className="form-control" placeholder="Address" required value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                      </div>
                    ) : (
                      <div className="col-12">
                        <select 
                          name="profession" 
                          className="form-control" 
                          required 
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)} // Ensure to update state if needed
                        >
                          <option value="" disabled selected>Select Profession</option>
                          <option value="plumber">Plumber</option>
                          <option value="electrician">Electrician</option>
                          <option value="painter">Painter</option>
                          <option value="carpenter">Carpenter</option>
                          <option value="technician">Technician</option>
                        </select>
                      </div>
                    )}
  
                    <div className="col-md-6">
                      <input type="text" name="city" className="form-control" placeholder="City" required value={city}
                      onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        name="pincode" 
                        className="form-control" 
                        placeholder="Pin Code" 
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)} 
                        pattern="[0-9]{6}"
                        title="Please enter a valid 6-digit pin code"
                      />
                    </div>
                    <div className="col-12">
                      <input type="text" name="state" className="form-control" placeholder="State" required value={state}
                      onChange={(e) => setState(e.target.value)} />
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary rounded-pill">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  
          {/* Sign In Form */}
          <div className={`${styles.signinForm} ${signIn ? styles.show : ''}`}>
          {/* <div className={`signin-form ${signIn ? 'show' : ''}`}> */}
            <div className="card border-0">
              <div className="card-body">
                <h2 className="card-title text-center mb-3">Sign In</h2>
                <form onSubmit={handleSignInSubmit}>
                  <div className="mb-3 text-center">
                    <div className="btn-group" role="group">
                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="userTypeSignin" 
                        id="userSignin" 
                        checked={userType === 'user'}
                        onChange={() => setUserType('user')}
                        required
                      />
                      <label className="btn btn-outline-primary" htmlFor="userSignin">User</label>
  
                      <input 
                        type="radio" 
                        className="btn-check" 
                        name="userTypeSignin" 
                        id="workerSignin"
                        checked={userType === 'worker'}
                        onChange={() => setUserType('worker')}
                        required
                      />
                      <label className="btn btn-outline-primary" htmlFor="workerSignin">Worker</label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Password" 
                      required
                      minLength="6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary rounded-pill">Sign In</button>
                </form>
              </div>
            </div>
          </div>
  
          {/* Overlay Container */}
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={styles.overlayLeft}>
          {/* <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-left"> */}
                <h2>Welcome Back!</h2>
                <p>To keep connected with us please login with your personal info</p>
                <button className="btn btn-outline-light rounded-pill" onClick={() => setSignIn(true)}>Sign In</button>
              </div>
              <div className={styles.overlayRight}>
              {/* <div className="overlay-right"> */}
                <h2>Hello, Friend!</h2>
                <p>Enter your personal details and start your journey with us</p>
                <button className="btn btn-outline-light rounded-pill" onClick={() => setSignIn(false)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // return (
  //   <div className="login-container">
  //     {renderContent()} {/* Call the render function */}
  //   </div>
  // );

  return (
    <div className={styles.loginContainer}>
      {renderContent()}
    </div>
  );
};


export default Login;
