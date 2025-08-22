import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import Service from './components/Service';
import Profile from './components/Profile';
import ViewRequests from './components/ViewRequests';
import HomePage from "./components/HomePage";
import UserDashboard from './components/UserDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import NearbyQuery from './components/NearbyQuery';
import AcceptedQuery from './components/AcceptedQuery';
import ProfileWorker from './components/ProfileWorker';
import Stripe from './components/Stripe';


export default function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Service />} />
          <Route path="/userProfile" element={<Profile />} />
          <Route path="/addedRequests" element={<ViewRequests />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/worker" element={<WorkerDashboard />} />
          <Route path="/nearbyworks" element={<NearbyQuery />} />
          <Route path="/acceptedworks" element={<AcceptedQuery />} />
          <Route path="/workerprofile" element={<ProfileWorker />} />
          <Route path="/stripe" element={<Stripe />} />
          

        </Routes>
      </div>
    </Router>
  );
}
